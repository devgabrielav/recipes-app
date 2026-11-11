import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helper/renderWithRouter';
import { getInProgress, getDoneRecipes, getFavorites } from '../helper/storage';
import { MEAL, mockApi, standardRoutes } from './fixtures';

describe('Explorar', () => {
  beforeEach(() => { mockApi(standardRoutes); });

  it('lista receitas, categorias e navega para os detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    expect(await screen.findByTestId('0-card-name')).toHaveTextContent(MEAL.strMeal);
    expect(screen.getByTestId('Vegetarian-category-filter')).toBeInTheDocument();

    await user.click(screen.getByTestId('0-recipe-card'));
    expect(window.location.pathname).toBe('/meals/52771');
    expect(await screen.findByTestId('recipe-title')).toHaveTextContent(MEAL.strMeal);
  });

  it('a busca por primeira letra valida 1 caractere sem usar alert', async () => {
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    await screen.findByTestId('0-card-name');

    await user.click(screen.getByTestId('search-top-btn'));
    await user.click(screen.getByTestId('first-letter-search-radio'));
    await user.type(screen.getByTestId('search-input'), 'ab');
    await user.click(screen.getByTestId('exec-search-btn'));

    expect(screen.getByTestId('search-error')).toHaveTextContent('exactly 1 character');
    expect(alert).not.toHaveBeenCalled();
  });

  it('um único resultado abre a receita direto', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    await screen.findByTestId('0-card-name');

    await user.click(screen.getByTestId('search-top-btn'));
    await user.click(screen.getByTestId('name-search-radio'));
    await user.type(screen.getByTestId('search-input'), 'Arrabiata');
    await user.click(screen.getByTestId('exec-search-btn'));

    await waitFor(() => expect(window.location.pathname).toBe('/meals/52771'));
  });

  it('sem resultados mostra estado vazio com botão para limpar filtros', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    await screen.findByTestId('0-card-name');
    mockApi({ 'search.php?s=zzz': { meals: null }, ...standardRoutes });

    await user.click(screen.getByTestId('search-top-btn'));
    await user.click(screen.getByTestId('name-search-radio'));
    await user.type(screen.getByTestId('search-input'), 'zzz');
    await user.click(screen.getByTestId('exec-search-btn'));

    expect(await screen.findByTestId('empty-results')).toBeInTheDocument();
  });
});

describe('Detalhes → em andamento → feita', () => {
  beforeEach(() => { mockApi(standardRoutes); });

  it('inicia a receita, marca ingredientes, finaliza e registra em "feitas"', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals/52771' });
    await user.click(await screen.findByTestId('start-recipe-btn'));

    expect(window.location.pathname).toBe('/meals/52771/in-progress');
    // aparece na lista de "em andamento" assim que é iniciada
    expect(Object.keys(getInProgress().meals)).toEqual(['52771']);

    const finish = await screen.findByTestId('finish-recipe-btn');
    expect(finish).toBeDisabled();

    const boxes = screen.getAllByRole('checkbox');
    expect(boxes).toHaveLength(3);
    for (const box of boxes) {
      // eslint-disable-next-line no-await-in-loop
      await user.click(box);
    }
    expect(getInProgress().meals['52771']).toHaveLength(3);
    expect(finish).toBeEnabled();

    await user.click(finish);
    expect(window.location.pathname).toBe('/done-recipes');
    expect(getDoneRecipes()).toHaveLength(1);
    expect(getDoneRecipes()[0]).toMatchObject({ id: '52771', type: 'meal', tags: ['Pasta', 'Curry'] });
    expect(getInProgress().meals).toEqual({});
  });

  it('o progresso sobrevive ao recarregar a página', async () => {
    const first = renderWithRouter(<App />, { route: '/meals/52771/in-progress' });
    await first.user.click((await screen.findAllByRole('checkbox'))[0]);
    first.unmount();

    renderWithRouter(<App />, { route: '/meals/52771/in-progress' });
    expect((await screen.findAllByRole('checkbox'))[0]).toBeChecked();
    expect(screen.getByTestId('progress-label')).toHaveTextContent('1 of 3');
  });

  it('favorita e desfavorita a receita', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals/52771' });
    await user.click(await screen.findByTestId('favorite-btn'));
    expect(getFavorites()).toHaveLength(1);
    await user.click(screen.getByTestId('favorite-btn'));
    expect(getFavorites()).toHaveLength(0);
  });

  it('no detalhe de uma receita já iniciada o botão vira "Continue recipe"', async () => {
    const first = renderWithRouter(<App />, { route: '/meals/52771' });
    await first.user.click(await screen.findByTestId('start-recipe-btn'));
    first.unmount();

    renderWithRouter(<App />, { route: '/meals/52771' });
    expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent('Continue recipe');
  });
});

describe('Aba "Em andamento"', () => {
  it('mostra estado vazio com atalho para explorar', async () => {
    mockApi(standardRoutes);
    renderWithRouter(<App />, { route: '/in-progress' });
    expect(screen.getByTestId('empty-in-progress')).toBeInTheDocument();
  });

  it('lista receitas iniciadas com progresso, permite continuar e descartar', async () => {
    mockApi(standardRoutes);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52771: ['olive oil'] }, drinks: {} }));
    localStorage.setItem('inProgressMeta', JSON.stringify({
      'meals:52771': { name: MEAL.strMeal, image: MEAL.strMealThumb, category: 'Vegetarian', total: 3 },
    }));
    const { user } = renderWithRouter(<App />, { route: '/in-progress' });

    const card = screen.getByTestId('0-in-progress-card');
    expect(card).toHaveTextContent(MEAL.strMeal);
    expect(card).toHaveTextContent('1 of 3 ingredients');
    expect(screen.getByTestId('0-continue-btn')).toHaveAttribute('href', '/meals/52771/in-progress');

    await user.click(screen.getByTestId('0-discard-btn'));
    expect(screen.getByTestId('empty-in-progress')).toBeInTheDocument();
    expect(getInProgress().meals).toEqual({});
  });

  it('completa dados de receitas iniciadas na versão antiga (sem metadados) via API', async () => {
    mockApi(standardRoutes);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52771: [] } }));
    renderWithRouter(<App />, { route: '/in-progress' });
    expect(await screen.findByText(MEAL.strMeal)).toBeInTheDocument();
  });

  it('a navegação tem o item "In progress" e o botão de ir para a home', async () => {
    mockApi(standardRoutes);
    const { user } = renderWithRouter(<App />, { route: '/in-progress' });
    expect(screen.getByTestId('in-progress-bottom-btn')).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByTestId('home-bottom-btn'));
    expect(window.location.pathname).toBe('/');
  });
});
