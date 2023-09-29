import { RecipeType } from '../utils/types';

const mealAPI = 'https://www.themealdb.com/api/json/v1/1';
const cocktailAPI = 'https://www.thecocktaildb.com/api/json/v1/1';

// função para buscar comidas por ingrediente, nome ou primeira letra
async function searchMealsAPI(option: string, query: string) : Promise<RecipeType[]> {
  let endpoint = '';

  if (option === 'ingredient') {
    endpoint = `${mealAPI}/filter.php?i=${query}`;
  } else if (option === 'name') {
    endpoint = `${mealAPI}/search.php?s=${query}`;
  } else if (option === 'first-letter') {
    endpoint = `${mealAPI}/search.php?f=${query}`;
  }

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}

// função para buscar receitas de bebida por ingrediente ou nome
async function searchCocktailsAPI(option: string, query: string) : Promise<RecipeType[]> {
  let endpoint = '';

  if (option === 'ingredient') {
    endpoint = `${cocktailAPI}/filter.php?i=${query}`;
  } else if (option === 'name') {
    endpoint = `${cocktailAPI}/search.php?s=${query}`;
  } else if (option === 'first-letter') {
    endpoint = `${cocktailAPI}/search.php?f=${query}`;
  }

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.drinks ? data.drinks : [];
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}

export { searchMealsAPI, searchCocktailsAPI };
