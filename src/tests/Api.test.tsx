import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { apiGet, clearApiCache } from '../helper/http';
import { getApiState, retryApi } from '../helper/apiStatus';
import {
  fetchAllRecipes, fetchCategories, getMealById, lookupById, searchCocktailsAPI, searchMealsAPI,
} from '../helper/helpersAPI';
import { renderWithRouter } from '../helper/renderWithRouter';
import {
  DRINK, MEAL, mockApi, mockApiDown, standardRoutes,
} from './fixtures';

const URL_A = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

describe('apiGet (timeout, retry e cache)', () => {
  it('tenta de novo em erro de rede e acaba tendo sucesso', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValue({ ok: true, status: 200, json: async () => ({ meals: [MEAL] }) });
    vi.stubGlobal('fetch', fn);

    const result = await apiGet<{ meals: unknown[] }>(URL_A);
    expect(result.source).toBe('network');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('não repete em erro 404 (não é falha temporária)', async () => {
    const fn = vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) });
    vi.stubGlobal('fetch', fn);
    const result = await apiGet(URL_A);
    expect(result).toEqual({ data: null, source: 'none' });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('repete em erro 500', async () => {
    const fn = vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) });
    vi.stubGlobal('fetch', fn);
    await apiGet(URL_A);
    expect(fn).toHaveBeenCalledTimes(3); // 1 + 2 retries
  });

  it('usa o cache antigo quando a rede cai e avisa a interface', async () => {
    mockApi({ 'search.php': { meals: [MEAL] } });
    await apiGet(URL_A);

    mockApiDown();
    const result = await apiGet(URL_A, { useFresh: false });
    expect(result.source).toBe('stale-cache');
    expect(getApiState().mode).toBe('cache');
  });

  it('junta requisições simultâneas iguais em uma só', async () => {
    const fn = mockApi({ 'search.php': { meals: [MEAL] } });
    await Promise.all([apiGet(URL_A), apiGet(URL_A), apiGet(URL_A)]);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('descarta respostas que não são JSON de objeto', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => null }));
    clearApiCache();
    expect((await apiGet(URL_A)).data).toBeNull();
  });
});

describe('helpersAPI com a API no ar', () => {
  beforeEach(() => { mockApi(standardRoutes); });

  it('busca por ingrediente, nome e primeira letra', async () => {
    expect((await searchMealsAPI('name', 'Arrabiata'))[0].idMeal).toBe('52771');
    expect((await searchCocktailsAPI('first-letter', 'S'))[0].idDrink).toBe('17141');
  });

  it('devolve lista vazia (sem usar exemplos) quando a API responde "nenhum resultado"', async () => {
    mockApi({ 'search.php': { meals: null } });
    expect(await searchMealsAPI('name', 'xablau')).toEqual([]);
    expect(getApiState().mode).toBe('online');
  });

  it('limita a lista inicial a 12 e as categorias a 8', async () => {
    mockApi({
      'search.php': { meals: Array.from({ length: 30 }, (_, i) => ({ idMeal: `${i}` })) },
      'list.php': { meals: Array.from({ length: 20 }, (_, i) => ({ strCategory: `c${i}` })) },
    });
    expect(await fetchAllRecipes('meals')).toHaveLength(12);
    expect(await fetchCategories('meals')).toHaveLength(8);
  });

  it('diferencia receita inexistente de API indisponível', async () => {
    mockApi({ 'lookup.php': { meals: null } });
    expect(await lookupById('meals', '1')).toEqual({ recipe: null, unavailable: false });
    clearApiCache();
    mockApiDown();
    expect(await lookupById('meals', '1')).toEqual({ recipe: null, unavailable: true });
  });
});

describe('API fora do ar', () => {
  beforeEach(() => { mockApiDown(); });

  it('lista receitas de exemplo e marca o modo "sample"', async () => {
    const list = await fetchAllRecipes('drinks');
    expect(list.length).toBeGreaterThan(0);
    expect(getApiState().mode).toBe('sample');
  });

  it('busca nas receitas de exemplo', async () => {
    const found = await searchMealsAPI('name', 'carbonara');
    expect(found.map((r) => r.strMeal)).toEqual(['Spaghetti Carbonara']);
  });

  it('abre receitas de exemplo pelo id offline', async () => {
    const meal = await getMealById('offline-m1');
    expect(meal?.strMeal).toBe('Spaghetti Carbonara');
  });

  it('a tela de comidas funciona sem expor o erro ao cliente', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument());
    expect(screen.queryByTestId('api-banner')).not.toBeInTheDocument();

    mockApi(standardRoutes);
    retryApi();
    expect(await screen.findByText(MEAL.strMeal)).toBeInTheDocument();
  });

  it('receita real nunca vista mostra erro claro em vez de tela em branco', async () => {
    renderWithRouter(<App />, { route: '/meals/52771' });
    expect(await screen.findByTestId('recipe-unavailable')).toBeInTheDocument();
  });

  it('receita real já vista continua abrindo pelo cache', async () => {
    mockApi(standardRoutes);
    await getMealById('52771');
    mockApiDown();
    renderWithRouter(<App />, { route: '/meals/52771' });
    expect(await screen.findByTestId('recipe-title')).toHaveTextContent(MEAL.strMeal);
  });
});

describe('receita inexistente com a API no ar', () => {
  it('mostra "não encontrada"', async () => {
    mockApi({ 'lookup.php': { meals: null, drinks: null }, 'search.php': { meals: [], drinks: [] } });
    renderWithRouter(<App />, { route: '/drinks/000' });
    expect(await screen.findByTestId('recipe-not-found')).toBeInTheDocument();
    expect(DRINK.idDrink).toBeTruthy();
  });
});
