import { screen } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';
import { renderWithRouter } from '../helper/renderWithRouter';
import App from '../App';
import useSaveInProgressRecipe from '../hooks/useSaveInProgressRecipe';

const delay = (milliseconds : number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
describe('useRecipesDetails', async () => {
  it('useRecipeDetails return the expected values in null route', async () => {
    renderWithRouter(<App />, { route: '/meals/abcde' });
    await delay(3000);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('useRecipeDetails return the expected values in  "/meals/52771"', async () => {
    renderWithRouter(<App />, { route: '/meals/52771' });
    await delay(3000);
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
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
});
