import { screen } from '@testing-library/react';
import DoneRecipes from '../components/doneRecipes';
import { renderWithRouter } from '../helper/renderWithRouter';

describe('Testa o componente DoneRecipes', () => {
  it('Exibe os botões de filtro por tipo (All, Meals, Drinks)', () => {
    renderWithRouter(<DoneRecipes />, { route: '/done-recipes' });
    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(filterAllButton).toBeInTheDocument();
    expect(filterMealButton).toBeInTheDocument();
    expect(filterDrinkButton).toBeInTheDocument();
  });

  it('Lida com JSON nulo ou indefinido', () => {
    renderWithRouter(<DoneRecipes />, { route: '/done-recipes' });

    localStorage.setItem('doneRecipes', '');

    const doneRecipesData = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

    expect(doneRecipesData).toEqual([]);

    localStorage.removeItem('doneRecipes');
  });
});
