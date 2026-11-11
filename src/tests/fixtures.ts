import { vi } from 'vitest';

export const MEAL = {
  idMeal: '52771',
  strMeal: 'Spicy Arrabiata Penne',
  strMealThumb: 'https://example.com/penne.jpg',
  strCategory: 'Vegetarian',
  strArea: 'Italian',
  strInstructions: 'Bring a large pot of water to a boil.',
  strTags: 'Pasta,Curry',
  strYoutube: '',
  strIngredient1: 'penne rigate',
  strIngredient2: 'olive oil',
  strIngredient3: 'garlic',
  strIngredient4: '',
  strMeasure1: '1 pound',
  strMeasure2: '1/4 cup',
  strMeasure3: '3 cloves',
  strMeasure4: '',
};

export const DRINK = {
  idDrink: '17141',
  strDrink: 'Smut',
  strDrinkThumb: 'https://example.com/smut.jpg',
  strCategory: 'Ordinary Drink',
  strAlcoholic: 'Alcoholic',
  strInstructions: 'Combine all ingredients.',
  strTags: null,
  strYoutube: '',
  strIngredient1: 'Red Wine',
  strIngredient2: 'Peach Schnapps',
  strMeasure1: '16 oz',
  strMeasure2: '1 oz',
};

const json = (body: unknown, status = 200) => ({
  ok: status < 400,
  status,
  json: async () => body,
}) as Response;

/** Responde conforme o trecho da URL; qualquer outra URL falha como se a rede tivesse caído. */
export function mockApi(routes: Record<string, unknown>) {
  const fn = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    const key = Object.keys(routes).find((part) => url.includes(part));
    if (!key) throw new TypeError('Failed to fetch');
    return json(routes[key]);
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

export function mockApiDown() {
  const fn = vi.fn(async () => { throw new TypeError('Failed to fetch'); });
  vi.stubGlobal('fetch', fn);
  return fn;
}

export const standardRoutes = {
  'themealdb.com/api/json/v1/1/lookup.php': { meals: [MEAL] },
  'thecocktaildb.com/api/json/v1/1/lookup.php': { drinks: [DRINK] },
  'themealdb.com/api/json/v1/1/search.php': { meals: [MEAL] },
  'thecocktaildb.com/api/json/v1/1/search.php': { drinks: [DRINK] },
  'list.php?c=list': { meals: [{ strCategory: 'Vegetarian' }], drinks: [{ strCategory: 'Cocktail' }] },
};
