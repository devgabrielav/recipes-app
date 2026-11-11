import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helper/renderWithRouter';
import { mockApiDown } from './fixtures';

const fav = (id: string, type: 'meal' | 'drink', name: string) => ({
  id, type, name, image: '', nationality: type === 'meal' ? 'Italian' : '', category: 'Pasta',
  alcoholicOrNot: type === 'drink' ? 'Alcoholic' : '',
});

describe('Favoritas e feitas', () => {
  beforeEach(() => { mockApiDown(); });

  it('favoritas: filtra por tipo e remove', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      fav('1', 'meal', 'Lasanha'), fav('2', 'drink', 'Mojito'),
    ]));
    const { user } = renderWithRouter(<App />, { route: '/favorite-recipes' });
    expect(screen.getAllByTestId(/saved-card/)).toHaveLength(2);

    await user.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getAllByTestId(/saved-card/)).toHaveLength(1);
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Mojito');

    await user.click(screen.getByTestId('0-horizontal-favorite-btn'));
    expect(screen.getByTestId('empty-favorites')).toBeInTheDocument();
  });

  it('feitas: mostra as mais recentes primeiro, com data e tags', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([
      { ...fav('1', 'meal', 'Antiga'), doneDate: '2024-01-10T12:00:00.000Z', tags: ['Pasta'] },
      { ...fav('2', 'meal', 'Recente'), doneDate: '2025-06-20T12:00:00.000Z', tags: [] },
    ]));
    renderWithRouter(<App />, { route: '/done-recipes' });
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Recente');
    expect(screen.getByTestId('1-horizontal-done-date')).toHaveTextContent('Done on');
    expect(screen.getByTestId('1-Pasta-horizontal-tag')).toBeInTheDocument();
  });

  it('feitas: ignora JSON inválido no localStorage sem quebrar', () => {
    localStorage.setItem('doneRecipes', '{not json');
    renderWithRouter(<App />, { route: '/done-recipes' });
    expect(screen.getByTestId('empty-done')).toBeInTheDocument();
  });

  it('textos de feitas/favoritas seguem o idioma escolhido', () => {
    renderWithRouter(<App />, { route: '/done-recipes', lang: 'pt' });
    expect(screen.getByTestId('page-title')).toHaveTextContent('Receitas feitas');
  });
});
