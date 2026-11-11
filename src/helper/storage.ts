import {
  DoneRecipeType, FavoriteRecipeType, InProgressMeta, InProgressStore, RecipeKind,
} from '../utils/types';

const KEYS = {
  user: 'user',
  favorites: 'favoriteRecipes',
  done: 'doneRecipes',
  inProgress: 'inProgressRecipes',
  inProgressMeta: 'inProgressMeta',
  lang: 'recipesApp:lang',
};
export { KEYS as STORAGE_KEYS };

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage cheio ou bloqueado: ignora, o app continua funcionando
  }
}

/* ----------------------------- usuário ----------------------------- */
export const getUser = () => readJSON<{ email?: string }>(KEYS.user, {});
export const saveUser = (email: string) => writeJSON(KEYS.user, { email });

/* ----------------------------- favoritos ----------------------------- */
export const getFavorites = () => {
  const list = readJSON<FavoriteRecipeType[]>(KEYS.favorites, []);
  return Array.isArray(list) ? list : [];
};

export const isFavorite = (id: string) => getFavorites().some((r) => r.id === id);

/** Alterna favorito. Devolve o novo estado (true = favoritado). */
export const saveToFavorites = (recipe: FavoriteRecipeType) => {
  const favorites = getFavorites();
  const exists = favorites.some((r) => r.id === recipe.id);
  writeJSON(
    KEYS.favorites,
    exists ? favorites.filter((r) => r.id !== recipe.id) : [...favorites, recipe],
  );
  return !exists;
};

/* ----------------------------- feitas ----------------------------- */
export const getDoneRecipes = () => {
  const list = readJSON<DoneRecipeType[]>(KEYS.done, []);
  return Array.isArray(list) ? list : [];
};

export const saveDoneRecipe = (recipe: DoneRecipeType) => (
  writeJSON(KEYS.done, [...getDoneRecipes(), recipe]));

/* ----------------------------- em andamento ----------------------------- */
const metaKey = (kind: RecipeKind, id: string) => `${kind}:${id}`;

/** Formato: { meals: { [id]: ingredientesMarcados[] }, drinks: { ... } } */
export function getInProgress(): InProgressStore {
  const raw = readJSON<Record<string, unknown>>(KEYS.inProgress, {});
  const sanitize = (value: unknown) => {
    const out: Record<string, string[]> = {};
    if (value && typeof value === 'object') {
      Object.entries(value as Record<string, unknown>).forEach(([id, list]) => {
        if (Array.isArray(list)) out[id] = list.filter((i) => typeof i === 'string');
      });
    }
    return out;
  };
  return { meals: sanitize(raw.meals), drinks: sanitize(raw.drinks) };
}

const saveInProgress = (store: InProgressStore) => writeJSON(KEYS.inProgress, store);
const getMetaStore = () => readJSON<Record<string, InProgressMeta>>(KEYS.inProgressMeta, {});

export const isInProgress = (kind: RecipeKind, id: string) => (
  Object.prototype.hasOwnProperty.call(getInProgress()[kind], id));

export const getCheckedIngredients = (kind: RecipeKind, id: string) => (
  getInProgress()[kind][id] ?? []);

export function setCheckedIngredients(kind: RecipeKind, id: string, list: string[]) {
  const store = getInProgress();
  saveInProgress({ ...store, [kind]: { ...store[kind], [id]: list } });
}

/** Marca a receita como iniciada (sem apagar progresso já existente). */
export function startRecipe(kind: RecipeKind, id: string, meta: InProgressMeta) {
  const store = getInProgress();
  if (!store[kind][id]) {
    saveInProgress({ ...store, [kind]: { ...store[kind], [id]: [] } });
  }
  writeJSON(KEYS.inProgressMeta, { ...getMetaStore(), [metaKey(kind, id)]: meta });
}

export function removeInProgress(kind: RecipeKind, id: string) {
  const store = getInProgress();
  const { [id]: _removed, ...rest } = store[kind];
  saveInProgress({ ...store, [kind]: rest });
  const { [metaKey(kind, id)]: _meta, ...metas } = getMetaStore();
  writeJSON(KEYS.inProgressMeta, metas);
}

export const getInProgressMeta = (kind: RecipeKind, id: string) => (
  getMetaStore()[metaKey(kind, id)] ?? null);

/** Apaga os dados do usuário deste aparelho, preservando só o idioma escolhido. */
export const clearAllData = () => {
  try {
    const lang = localStorage.getItem(KEYS.lang);
    localStorage.clear();
    if (lang !== null) localStorage.setItem(KEYS.lang, lang);
  } catch { /* noop */ }
};
