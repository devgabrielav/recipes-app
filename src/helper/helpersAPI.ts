import { apiGet } from './http';
import { reportFallback } from './apiStatus';
import {
  isOfflineId, offlineById, offlineByCategory, offlineCategories, offlineList,
  offlineRandom, offlineSearch,
} from './offlineData';
import {
  DrinksDetailsType, MealsDetailsType, RecipeKind, RecipeType,
} from '../utils/types';

const BASE: Record<RecipeKind, string> = {
  meals: 'https://www.themealdb.com/api/json/v1/1',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1',
};

type Payload = Record<string, unknown[] | null>;

export const kindFromPath = (pathname: string): RecipeKind => (
  pathname.includes('meals') ? 'meals' : 'drinks');

/** Pega a lista (`meals`/`drinks`) de uma resposta. `null` = API indisponível. */
async function fetchList<T>(kind: RecipeKind, path: string, useFresh = true) {
  const { data } = await apiGet<Payload>(`${BASE[kind]}/${path}`, { useFresh });
  if (!data) return null;
  const list = data[kind];
  return (Array.isArray(list) ? list : []) as T[];
}

/* Sem rede e sem cache: usa as receitas de exemplo e avisa a interface. */
function sample<T>(value: T): T {
  reportFallback('sample');
  return value;
}

const ALL_RECIPES_PATH = 'search.php?s=';

/* ------------------------------- busca ------------------------------- */
const searchPath = (option: string, query: string) => {
  const q = encodeURIComponent(query.trim());
  if (option === 'ingredient') return `filter.php?i=${q}`;
  if (option === 'first-letter') return `search.php?f=${q}`;
  return `search.php?s=${q}`;
};

async function searchRecipes(kind: RecipeKind, option: string, query: string) {
  const list = await fetchList<RecipeType>(kind, searchPath(option, query));
  return list ?? sample(offlineSearch(kind, option, query));
}

export const searchMealsAPI = (option: string, query: string) => (
  searchRecipes('meals', option, query));
export const searchCocktailsAPI = (option: string, query: string) => (
  searchRecipes('drinks', option, query));

/* ------------------------------ detalhes ------------------------------ */
export type LookupResult<T> = { recipe: T | null; unavailable: boolean };

/**
 * Busca uma receita por id. `unavailable` = a API não respondeu e não há cópia salva
 * (diferente de `recipe: null` com API ok, que significa "essa receita não existe").
 */
export async function lookupById<T extends MealsDetailsType | DrinksDetailsType>(
  kind: RecipeKind,
  id: string,
): Promise<LookupResult<T>> {
  if (isOfflineId(id)) {
    return { recipe: offlineById(kind, id) as T | null, unavailable: false };
  }
  const list = await fetchList<T>(kind, `lookup.php?i=${encodeURIComponent(id)}`);
  return list
    ? { recipe: list[0] ?? null, unavailable: false }
    : { recipe: null, unavailable: true };
}

export const getMealById = async (id: string) => (
  (await lookupById<MealsDetailsType>('meals', id)).recipe);
export const getDrinkById = async (id: string) => (
  (await lookupById<DrinksDetailsType>('drinks', id)).recipe);

/** Receita aleatória (landing). Nunca usa cache "fresco" para variar a cada visita. */
export async function getRandomRecipe(kind: RecipeKind) {
  const list = await fetchList<MealsDetailsType | DrinksDetailsType>(
    kind,
    'random.php',
    false,
  );
  if (list?.[0]) return list[0];
  return sample(offlineRandom(kind));
}

/* ------------------------ listas da tela inicial ------------------------ */
export async function fetchAllRecipes(kind: RecipeKind): Promise<RecipeType[]> {
  const list = await fetchList<RecipeType>(kind, ALL_RECIPES_PATH);
  if (list && list.length > 0) return list.slice(0, 12);
  return sample(offlineList(kind)).slice(0, 12);
}

export async function fetchByCategory(kind: RecipeKind, category: string) {
  const list = await fetchList<RecipeType>(
    kind,
    `filter.php?c=${encodeURIComponent(category)}`,
  );
  if (list && list.length > 0) return list.slice(0, 12);
  return sample(offlineByCategory(kind, category)).slice(0, 12);
}

export async function fetchCategories(kind: RecipeKind) {
  const list = await fetchList<{ strCategory: string }>(kind, 'list.php?c=list');
  return (list ?? sample(offlineCategories(kind))).slice(0, 8);
}

/* ---------------------------- recomendações ---------------------------- */
/** Receitas do "outro tipo": comidas sugerem bebidas e vice-versa. */
export async function getMealsRecommendations(): Promise<RecipeType[]> {
  const list = await fetchList<RecipeType>('meals', ALL_RECIPES_PATH);
  return (list ?? sample(offlineList('meals'))).slice(0, 6);
}

export async function getDrinksRecommendations(): Promise<RecipeType[]> {
  const list = await fetchList<RecipeType>('drinks', ALL_RECIPES_PATH);
  return (list ?? sample(offlineList('drinks'))).slice(0, 6);
}
