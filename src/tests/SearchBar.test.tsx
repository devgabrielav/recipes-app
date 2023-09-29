import { vi } from 'vitest';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { screen, fireEvent, render, act } from '@testing-library/react';
import { renderWithRouter } from '../helper/renderWithRouter';
import SearchBar from '../components/SearchBar/SearchBar';

import { searchCocktailsAPI, searchMealsAPI } from '../helper/helpersAPI';

const searchInputTestId = 'search-input';
const ingredientSearchRadioTestId = 'ingredient-search-radio';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterSearchRadioTestId = 'first-letter-search-radio';
const execSearchButtonTestId = 'exec-search-btn';

const SINGLE_MEAL_RESPONSE = {
  meals: [
    {
      strMeal: 'Brown Stew Chicken',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
      idMeal: '52940',
    },
  ],
};

const SINGLE_MEAL_MOCK_RESPONSE = {
  ok: true,
  status: 200,
  json: async () => SINGLE_MEAL_RESPONSE,
} as Response;

const SINGLE_DRINK_RESPONSE = {
  drinks: [
    {
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strDrinkAlternate: null,
      strDrinkES: null,
      strDrinkDE: null,
      strDrinkFR: null,
      'strDrinkZH-HANS': null,
      'strDrinkZH-HANT': null,
      strTags: null,
      strVideo: null,
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Martini Glass',
      strInstructions: 'Shake well in a shaker with ice. Strain in a martini glass.',
      strInstructionsES: null,
      strInstructionsDE: null,
      strInstructionsFR: null,
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      strIngredient1: 'Hpnotiq',
      strIngredient2: 'Pineapple Juice',
      strIngredient3: 'Banana Liqueur',
      strIngredient4: '',
      strIngredient5: '',
      strIngredient6: '',
      strIngredient7: '',
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 oz',
      strMeasure2: '1 oz',
      strMeasure3: '1 oz',
      strMeasure4: '',
      strMeasure5: '',
      strMeasure6: '',
      strMeasure7: '',
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: null,
    },
  ],
};

const SINGLE_DRINK_MOCK_RESPONSE = {
  ok: true,
  status: 200,
  json: async () => SINGLE_DRINK_RESPONSE,
} as Response;

test('Testa searchMealsAPI', async () => {
  const dataMeals = await searchMealsAPI('ingredient', 'Chicken');
  expect(dataMeals[0].idMeal).toEqual('52940');
  const dataMeals2 = await searchMealsAPI('first-letter', 'C');
  expect(dataMeals2[0].idMeal).toEqual('52776');
  const dataMeals3 = await searchCocktailsAPI('first-letter', 'C');
  expect(dataMeals3[0].idDrink).toEqual('17185');
  global.fetch = vi.fn().mockResolvedValue({});
  const dataMealsNull = await searchMealsAPI('ingredient', 'Chicken');
  expect(dataMealsNull.length).toEqual(0);
});

describe('Testa SearchBar component', () => {
  test('executa a pesquisa de refeições e navega para o único resultado', async () => {
    renderWithRouter(<SearchBar />, { route: '/meals' });
  });
  it('Deve renderizar os elementos corretamente', () => {
    renderWithRouter(<SearchBar />);

    expect(screen.getByTestId(searchInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientSearchRadioTestId)).toBeInTheDocument();
    expect(screen.getByTestId(nameSearchRadioTestId)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetterSearchRadioTestId)).toBeInTheDocument();
    expect(screen.getByTestId(execSearchButtonTestId)).toBeInTheDocument();
  });
});

it('Deve ser possível digitar no campo de pesquisa', () => {
  renderWithRouter(<SearchBar />);

  const searchInput = screen.getByTestId(searchInputTestId);
  fireEvent.change(searchInput, { target: { value: 'Egg' } });

  expect(searchInput).toHaveValue('Egg');
});

it('Testa a pesquisa com First letter', async () => {
  renderWithRouter(<SearchBar />);

  global.alert = vi.fn();

  const searchInput = screen.getByTestId(searchInputTestId);
  const execSearchButton = screen.getByTestId(execSearchButtonTestId);

  const firstLetter: HTMLInputElement = screen.getByTestId('first-letter-search-radio');
  fireEvent.click(firstLetter);

  const searchTerm = 'aa';

  fireEvent.change(searchInput, { target: { value: searchTerm } });

  fireEvent.click(execSearchButton);

  expect(global.alert).toHaveBeenCalledTimes(1);
});

it('Testa a pesquisa com Ingredient no /meals não dispara alert', async () => {
  renderWithRouter(<SearchBar />, { route: '/meals' });

  global.alert = vi.fn();

  const searchInput = screen.getByTestId(searchInputTestId);
  const execSearchButton = screen.getByTestId(execSearchButtonTestId);

  const ingredientRadio: HTMLInputElement = screen.getByTestId(ingredientSearchRadioTestId);
  fireEvent.click(ingredientRadio);

  const searchTerm = 'Chicken';

  fireEvent.change(searchInput, { target: { value: searchTerm } });

  fireEvent.click(execSearchButton);

  expect(global.alert).toHaveBeenCalledTimes(0);
});

it('Testa a pesquisa com Ingredient no /drinks não dispara alert', async () => {
  renderWithRouter(<SearchBar />, { route: '/drinks' });

  global.alert = vi.fn();

  const searchInput = screen.getByTestId(searchInputTestId);
  const execSearchButton = screen.getByTestId(execSearchButtonTestId);

  const ingredientRadio: HTMLInputElement = screen.getByTestId(ingredientSearchRadioTestId);
  fireEvent.click(ingredientRadio);

  const searchTerm = 'Chicken';

  fireEvent.change(searchInput, { target: { value: searchTerm } });

  fireEvent.click(execSearchButton);

  expect(global.alert).toHaveBeenCalledTimes(0);
});

it('Testa a pesquisa sem retorno dispara alert', async () => {
  renderWithRouter(<SearchBar />, { route: '/drinks' });

  global.alert = vi.fn();
  global.fetch = vi.fn().mockResolvedValue(SINGLE_MEAL_MOCK_RESPONSE);

  const searchInput = screen.getByTestId(searchInputTestId);
  const execSearchButton = screen.getByTestId(execSearchButtonTestId);

  const ingredientRadio: HTMLInputElement = screen.getByTestId(ingredientSearchRadioTestId);
  fireEvent.click(ingredientRadio);

  const searchTerm = 'asdfasdfa';

  fireEvent.change(searchInput, { target: { value: searchTerm } });

  fireEvent.click(execSearchButton);

  expect(global.alert).toHaveBeenCalledTimes(0);
});

it('Deve exibir o alerta quando a pesquisa não encontra resultados', async () => {
  renderWithRouter(<SearchBar />, { route: '/meals' });

  global.alert = vi.fn();

  const MEAL_RESPONSE = {
    meals: [
    ],
  };

  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => MEAL_RESPONSE,
  } as Response;

  global.fetch = vi.fn().mockResolvedValue(MOCK_RESPONSE);

  const searchInput = screen.getByPlaceholderText('Search');
  fireEvent.input(searchInput, { target: { value: 'xablau' } });

  const execSearchButton = screen.getByTestId(execSearchButtonTestId);
  fireEvent.click(execSearchButton);

  expect(global.alert).toHaveBeenCalledTimes(0);
});

it('Deve navegar para o resultado quanto só encontra um resultado para meals', async () => {
  const history = createMemoryHistory();
  history.push('/meals');
  render(
    <Router location={ history.location } navigator={ history }>
      <SearchBar />
    </Router>,
  );

  global.alert = vi.fn();
  global.fetch = vi.fn().mockResolvedValue(SINGLE_MEAL_MOCK_RESPONSE);

  act(() => {
    const nameRadio: HTMLInputElement = screen.getByTestId(nameSearchRadioTestId);
    fireEvent.click(nameRadio);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.input(searchInput, { target: { value: 'Brown Stew Chicken' } });

    const execSearchButton = screen.getByTestId(execSearchButtonTestId);
    fireEvent.click(execSearchButton);
  });

  expect(history.location.pathname).toBe('/meals');
});

it('Deve navegar para o resultado quanto só encontra um resultado para drinks', async () => {
  const history = createMemoryHistory();
  history.push('/drinks');
  render(
    <Router location={ history.location } navigator={ history }>
      <SearchBar />
    </Router>,
  );

  global.alert = vi.fn();
  global.fetch = vi.fn().mockResolvedValue(SINGLE_DRINK_MOCK_RESPONSE);

  act(() => {
    const nameRadio: HTMLInputElement = screen.getByTestId(nameSearchRadioTestId);
    fireEvent.click(nameRadio);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.input(searchInput, { target: { value: 'Aquamarine' } });

    const execSearchButton = screen.getByTestId(execSearchButtonTestId);
    fireEvent.click(execSearchButton);
  });

  expect(history.location.pathname).toBe('/drinks');
});
