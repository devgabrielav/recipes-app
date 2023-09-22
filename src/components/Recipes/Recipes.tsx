import { useEffect, useState } from 'react';
import RecipeCard from '../SearchBar/RecipeCard';
import { DrinkType, MealType } from '../../utils/types';

export type RouteType = {
  recipe: string
};

function Recipes({ recipe } : RouteType) {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [drinks, setDrinks] = useState<DrinkType[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const drinksResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const drinksData = await drinksResponse.json();
      setMeals(data.meals);
      setDrinks(drinksData.drinks);
    };
    fetchRecipes();
  }, []);
  if (recipe === 'meals') {
    return (
      <RecipeCard recipes={ meals } type="meals" />
    );
  }
  return (
    <RecipeCard recipes={ drinks } type="drinks" />
  );
}

export default Recipes;
