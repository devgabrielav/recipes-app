import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { Lang, LANGS, TranslationKey, translations } from './translations';
import { translateArea, translateCategory } from './catalog';
import { readJSON, STORAGE_KEYS, writeJSON } from '../helper/storage';

type Vars = Record<string, string | number>;

export type I18n = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, vars?: Vars) => string;
  /** Plural simples: usa as chaves `${base}_one` / `${base}_other`. */
  plural: (base: 'results', count: number) => string;
  category: (value: string) => string;
  area: (value: string) => string;
  formatDate: (iso: string) => string;
};

const interpolate = (text: string, vars?: Vars) => (vars
  ? text.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`))
  : text);

export function detectLang(): Lang {
  const saved = readJSON<string | null>(STORAGE_KEYS.lang, null);
  if (saved && (LANGS as string[]).includes(saved)) return saved as Lang;
  const browser = typeof navigator !== 'undefined' ? navigator.language : 'pt';
  return browser.toLowerCase().startsWith('en') ? 'en' : 'pt';
}

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children, initialLang }: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? detectLang());

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeJSON(STORAGE_KEYS.lang, next);
  }, []);

  const value = useMemo<I18n>(() => {
    const t: I18n['t'] = (key, vars) => interpolate(translations[lang][key], vars);
    return {
      lang,
      setLang,
      t,
      plural: (base, count) => t(
        `${base}_${count === 1 ? 'one' : 'other'}` as TranslationKey,
        { count },
      ),
      category: (v) => translateCategory(v, lang),
      area: (v) => translateArea(v, lang),
      formatDate: (iso) => {
        const date = new Date(iso);
        return Number.isNaN(date.getTime())
          ? iso
          : date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
            day: '2-digit', month: 'short', year: 'numeric',
          });
      },
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={ value }>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
