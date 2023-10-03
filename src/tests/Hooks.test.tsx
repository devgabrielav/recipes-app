import { screen } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';
import { renderWithRouter } from '../helper/renderWithRouter';
import App from '../App';
import useSaveInProgressRecipe from '../hooks/useSaveInProgressRecipe';
import RecipeDetails from '../pages/RecipeDetails';

const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));
describe('useRecipesDetails', async () => {
  it('throw error case id route is not found', async () => {
    expect(() => renderWithRouter(<RecipeDetails />, { route: '/meals/52885' })).toThrow('ID not found!');
  });
  it('useRecipeDetails return the expected values in incorrect route', async () => {
    renderWithRouter(<App />, { route: '/meals/abcde' });
    await delay();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('useRecipeDetails return the expected values in  "/meals/52771"', async () => {
    renderWithRouter(<App />, { route: '/meals/52771' });
    await delay();
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
  });

  it('useRecipeDetails return the expected values in  "/drinks/17141"', async () => {
    renderWithRouter(<App />, { route: '/drinks/17141' });
    await delay();
    expect(screen.getByText('Smut')).toBeInTheDocument();
  });
});

describe('useSaveInProgressRecipe', () => {
  it('hook call setItem and getItem with correct values', async () => {
    const { result } = renderHook(() => useSaveInProgressRecipe('52771'));
    const { onChange } = result.current;
    global.localStorage = {
      getItem: vi.fn().mockReturnValue('{}'),
      setItem: vi.fn(),
    };
    act(() => {
      onChange('fakeIngredient');
    });
    expect(result.current.checkeds.fakeIngredient).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('inProgressRecipes', JSON.stringify({ 52771: { fakeIngredient: true } }));
  });
  it('case not id return correct object', () => {
    const { result } = renderHook(() => useSaveInProgressRecipe(''));
    expect(result.current.checkeds).toEqual({});
    expect(typeof result.current.onChange === 'function').toBeTruthy();
  });
});
