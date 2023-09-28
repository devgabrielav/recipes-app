import { MealsDetailsType, DrinksDetailsType, ProductDetailsType } from '../utils/types';

export function ProductDetailsConverter(data: MealsDetailsType | DrinksDetailsType) {
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
      strCategory: newData.strCategory,
      strAlcoholic: newData.strAlcoholic,
    };
    delete newData.idDrink;
    delete newData.strDrink;
    return { ...newData, ...uniqueValues } as ProductDetailsType;
  }
  return null;
}

export function getIngredientsAndMeasures(recipeDetails: ProductDetailsType) {
  const ingredients = Object.keys(recipeDetails).filter((key) => (key
    .includes('strIngredient'))).reduce<string[]>((arr, key) => {
    const ingredient = recipeDetails[key as keyof typeof recipeDetails];
    if (ingredient) {
      arr.push(ingredient);
    }
    return arr;
  }, []);
  const measures = Object.keys(recipeDetails).filter((key) => (key
    .includes('strMeasure'))).reduce<string[]>((arr, key) => {
    const measure = recipeDetails[key as keyof typeof recipeDetails];
    if (measure) {
      arr.push(measure);
    }
    return arr;
  }, []);
  return { ingredients, measures };
}
