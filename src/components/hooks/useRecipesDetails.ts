import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DrinksDetailsType,
  MealsDetailsType, ProductDetailsType } from '../../utils/types';
import { getDrinkById, getMealById } from '../../helper/helpersAPI';

const dataConverter = (data: MealsDetailsType | DrinksDetailsType) => {
  const newData = { ...data } as any;
  if ('idMeal' in data) {
    const uniqueValues = {
      id: newData.idMeal,
      str: newData.strMeal,
      img: newData.strMealThumb,
    };
    delete newData.idMeal;
    delete newData.strMeal;
    return { ...newData, ...uniqueValues } as ProductDetailsType;
  }

  if ('idDrink' in data) {
    const uniqueValues = {
      id: newData.idDrink,
      str: newData.strDrink,
      img: newData.strDrinkThumb,
      strCategory: newData.strAlcoholic,
    };
    delete newData.idDrink;
    delete newData.strDrink;
    delete newData.strAlcoholic;
    return { ...newData, ...uniqueValues } as ProductDetailsType;
  }
  return null;
};

export default function useRecipesDetails() {
  const { pathname } = useLocation();
  const isMealsPath = pathname.replace(/\/(.*)\/.*/, '$1') === 'meals';
  const id = pathname.replace(/\/.*\/(.*)/, '$1');
  const [recipeDetails, setRecipeDetails] = useState<
  MealsDetailsType | DrinksDetailsType | null>(null);

  useEffect(() => {
    (async () => {
      const data = await (isMealsPath ? getMealById(id) : getDrinkById(id));

      setRecipeDetails(data);
    })();
  }, [id, isMealsPath]);

  return recipeDetails ? dataConverter(recipeDetails) : null;
}
