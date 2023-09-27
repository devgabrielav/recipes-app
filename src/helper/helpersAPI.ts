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
    return data.meals ? data.meals : [];
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

const fetchCategories = async (pathname: string) => {
  try {
    const endpoint = pathname === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const response = await fetch(endpoint);
    const data = await response.json();
    return (data[pathname.replace('/', '')].slice(0, 5));
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};

const fetchByCategory = async (pathname: string, category: string) => {
  try {
    const endpoint = pathname === '/meals'
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    return (data[pathname.replace('/', '')].slice(0, 12));
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
  }
};

const fetchAllRecipes = async (pathname: string) => {
  try {
    const endpointAll = pathname === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    const responseAll = await fetch(endpointAll);
    const dataAll = await responseAll.json();
    return (dataAll[pathname.replace('/', '')].slice(0, 12));
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
  }
};

export { searchMealsAPI,
  searchCocktailsAPI, fetchCategories, fetchByCategory, fetchAllRecipes };
