import { reportSuccess, reportFallback } from './apiStatus';

/** Ajustável (os testes zeram o backoff). */
export const apiConfig = {
  timeoutMs: 8000,
  retries: 2,
  backoffMs: 400,
  freshMs: 10 * 60 * 1000,
};

const CACHE_KEY = 'recipesApp:apiCache:v1';
const MAX_ENTRIES = 80;

type Entry = { t: number; data: unknown };
export type ApiResult<T> = {
  data: T | null;
  source: 'network' | 'fresh-cache' | 'stale-cache' | 'none';
};

const memory = new Map<string, Entry>();
const inflight = new Map<string, Promise<ApiResult<unknown>>>();

function readStore(): Record<string, Entry> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function getEntry(url: string): Entry | undefined {
  return memory.get(url) ?? readStore()[url];
}

function saveEntry(url: string, data: unknown) {
  const entry = { t: Date.now(), data };
  memory.set(url, entry);
  try {
    const store = { ...readStore(), [url]: entry };
    const keys = Object.keys(store);
    if (keys.length > MAX_ENTRIES) {
      keys.sort((a, b) => store[a].t - store[b].t)
        .slice(0, keys.length - MAX_ENTRIES)
        .forEach((key) => delete store[key]);
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(store));
  } catch {
    // quota cheia / modo privado: o cache em memória continua valendo
  }
}

export function clearApiCache() {
  memory.clear();
  inflight.clear();
  try { localStorage.removeItem(CACHE_KEY); } catch { /* noop */ }
}

const sleep = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });

async function fetchOnce(url: string): Promise<{ data?: unknown; retry: boolean }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), apiConfig.timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response || typeof response.json !== 'function') return { retry: true };
    if (!response.ok) return { retry: response.status >= 500 || response.status === 429 };
    const data = await response.json();
    return data && typeof data === 'object' ? { data, retry: false } : { retry: true };
  } catch {
    return { retry: true };
  } finally {
    clearTimeout(timer);
  }
}

async function requestWithRetry(url: string): Promise<unknown | null> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return null;
  for (let attempt = 0; attempt <= apiConfig.retries; attempt += 1) {
    // eslint-disable-next-line no-await-in-loop
    const result = await fetchOnce(url);
    if (result.data) return result.data;
    if (!result.retry || attempt === apiConfig.retries) break;
    // eslint-disable-next-line no-await-in-loop
    await sleep(apiConfig.backoffMs * (2 ** attempt));
  }
  return null;
}

type Options = {
  /** false = nunca usa cache "fresco" (ex.: endpoints aleatórios). Ainda usa cache velho se a rede cair. */
  useFresh?: boolean;
  /** false = não grava a resposta no cache. */
  store?: boolean;
};

/**
 * GET JSON resiliente: timeout, retry com backoff, deduplicação de requisições
 * simultâneas e cache (fresco por alguns minutos, velho como último recurso).
 * Nunca lança erro: devolve `data: null` quando não há nada a mostrar.
 */
export function apiGet<T>(url: string, options: Options = {}): Promise<ApiResult<T>> {
  const { useFresh = true, store = true } = options;
  const cached = getEntry(url);
  if (useFresh && cached && Date.now() - cached.t < apiConfig.freshMs) {
    return Promise.resolve({ data: cached.data as T, source: 'fresh-cache' });
  }
  const existing = inflight.get(url);
  if (existing) return existing as Promise<ApiResult<T>>;

  const promise = (async (): Promise<ApiResult<T>> => {
    try {
      const data = await requestWithRetry(url);
      if (data) {
        if (store) saveEntry(url, data);
        reportSuccess();
        return { data: data as T, source: 'network' };
      }
      if (cached) {
        reportFallback('cache');
        return { data: cached.data as T, source: 'stale-cache' };
      }
      return { data: null, source: 'none' };
    } finally {
      inflight.delete(url);
    }
  })();
  inflight.set(url, promise);
  return promise;
}
