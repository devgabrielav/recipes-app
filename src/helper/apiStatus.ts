/**
 * Pequeno "store" global que diz à UI em que estado a API está:
 *  - online:  respostas vindas da rede
 *  - cache:   rede indisponível, usando respostas salvas anteriormente
 *  - sample:  rede indisponível e sem cache, usando receitas de exemplo embutidas
 */
import { useSyncExternalStore } from 'react';

export type ApiMode = 'online' | 'cache' | 'sample';
export type ApiState = { mode: ApiMode; version: number; lastFailed: boolean };

let state: ApiState = { mode: 'online', version: 0, lastFailed: false };
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());
const set = (next: Partial<ApiState>) => {
  const merged = { ...state, ...next };
  if (merged.mode === state.mode && merged.version === state.version
    && merged.lastFailed === state.lastFailed) return;
  state = merged;
  emit();
};

export const getApiState = () => state;
export const subscribeApi = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

export const reportSuccess = () => set({ mode: 'online', lastFailed: false });
export const reportFallback = (mode: 'cache' | 'sample') => {
  // "sample" é pior que "cache": não rebaixa o aviso enquanto não houver sucesso.
  set({ mode: state.mode === 'sample' ? 'sample' : mode, lastFailed: true });
};
/** Pede para as telas buscarem de novo (botão "Tentar novamente"). */
export const retryApi = () => set({ version: state.version + 1, lastFailed: false });
export const resetApiState = () => {
  state = { mode: 'online', version: 0, lastFailed: false };
  emit();
};

export function useApiStatus() {
  return useSyncExternalStore(subscribeApi, getApiState, getApiState);
}

if (typeof window !== 'undefined') {
  // Quando o navegador volta a ficar online, tenta de novo automaticamente.
  window.addEventListener('online', () => retryApi());
}
