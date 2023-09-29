import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProductDetailsType, RecipeType } from '../utils/types';
import { getDrinkById, getDrinksRecommendations,
  getMealById, getMealsRecommendations } from '../helper/helpersAPI';
import { ProductDetailsConverter } from '../helper/dataConverters';

type DataReturnType = {
  recipeDetails: ProductDetailsType | null;
  recommendations: RecipeType[];
};

export default function useRecipesDetails() {
  const { pathname } = useLocation();
  const isMealsPath = pathname.includes('meals');
  const { id } = useParams();
  const [data, setData] = useState<DataReturnType>({ recipeDetails: null,
    recommendations: [] });
  if (!id) throw new Error('ID not found!');

  useEffect(() => {
    (async () => {
      const recipeAPIData = await (isMealsPath ? getMealById(id) : getDrinkById(id));
      const recipeDetails = recipeAPIData ? ProductDetailsConverter(recipeAPIData) : null;
      const recommendationsAPIData = await (isMealsPath
        ? getDrinksRecommendations() : getMealsRecommendations());
      const recommendations = recommendationsAPIData || [];

      setData(
        {
          recipeDetails,
          recommendations,
        },
      );
    })();
  }, [id, isMealsPath]);

  return data;
}
