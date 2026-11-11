import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';
import { apiConfig, clearApiCache } from './src/helper/http';
import { resetApiState } from './src/helper/apiStatus';

// Sem espera entre as tentativas e com timeout curto: os testes não precisam de rede real.
apiConfig.backoffMs = 0;
apiConfig.timeoutMs = 500;

beforeEach(() => {
  localStorage.clear();
  clearApiCache();
  resetApiState();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
