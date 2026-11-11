import { vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useSaveInProgressRecipe from '../hooks/useSaveInProgressRecipe';
import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouter } from '../helper/renderWithRouter';
import { getInProgress } from '../helper/storage';

describe('useRecipesDetails', () => {
  it('lança erro quando a rota não tem id', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderWithRouter(<RecipeDetails />, { route: '/meals/52885' }))
      .toThrow('ID not found!');
  });
});

describe('useSaveInProgressRecipe', () => {
  it('persiste os ingredientes marcados por tipo e id', () => {
    const { result } = renderHook(() => useSaveInProgressRecipe('52771', 'meals'));
    act(() => { result.current.onChange('garlic'); });

    expect(result.current.checkeds.garlic).toBe(true);
    expect(getInProgress().meals['52771']).toEqual(['garlic']);

    act(() => { result.current.onChange('garlic'); });
    expect(result.current.checkeds.garlic).toBe(false);
    expect(getInProgress().meals['52771']).toEqual([]);
  });

  it('comida e bebida com o mesmo id não se misturam', () => {
    const meal = renderHook(() => useSaveInProgressRecipe('1', 'meals'));
    const drink = renderHook(() => useSaveInProgressRecipe('1', 'drinks'));
    act(() => { meal.result.current.onChange('a'); });
    act(() => { drink.result.current.onChange('b'); });
    expect(getInProgress()).toEqual({ meals: { 1: ['a'] }, drinks: { 1: ['b'] } });
  });

  it('sem id devolve objeto vazio e não grava nada', () => {
    const { result } = renderHook(() => useSaveInProgressRecipe(''));
    expect(result.current.checkeds).toEqual({});
    act(() => { result.current.onChange('x'); });
    expect(localStorage.getItem('inProgressRecipes')).toBeNull();
  });

  it('lê o formato antigo/corrompido sem quebrar', () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 5: 'lixo' }, drinks: null }));
    expect(getInProgress()).toEqual({ meals: {}, drinks: {} });
  });
});
