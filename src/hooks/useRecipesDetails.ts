import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProductDetailsType, RecipeType } from '../utils/types';
import {
  getDrinksRecommendations, getMealsRecommendations, kindFromPath, lookupById,
} from '../helper/helpersAPI';
import { ProductDetailsConverter } from '../helper/dataConverters';
import { useApiStatus } from '../helper/apiStatus';

export type DetailsStatus = 'loading' | 'ready' | 'not-found' | 'unavailable';

type DataReturnType = {
  recipeDetails: ProductDetailsType | null;
  recommendations: RecipeType[];
  status: DetailsStatus;
};

/**
 * Carrega a receita da rota. `withRecommendations` busca também as sugestões
 * (desnecessário na tela "em andamento").
 */
export default function useRecipesDetails(withRecommendations = true) {
  const { pathname } = useLocation();
  const kind = kindFromPath(pathname);
  const { id } = useParams();
  const { version } = useApiStatus();
  const [data, setData] = useState<DataReturnType>({
    recipeDetails: null, recommendations: [], status: 'loading',
  });
  if (!id) throw new Error('ID not found!');

  useEffect(() => {
    let cancelled = false;
    setData((prev) => (prev.status === 'ready' && prev.recipeDetails?.id === id
      ? prev : { recipeDetails: null, recommendations: [], status: 'loading' }));

    (async () => {
      const { recipe: raw, unavailable } = await lookupById(kind, id);
      const recipeDetails = raw ? ProductDetailsConverter(raw) : null;
      if (cancelled) return;
      if (!recipeDetails) {
        setData({
          recipeDetails: null,
          recommendations: [],
          status: unavailable ? 'unavailable' : 'not-found',
        });
        return;
      }
      setData({ recipeDetails, recommendations: [], status: 'ready' });
      if (!withRecommendations) return;
      const recommendations = await (kind === 'meals'
        ? getDrinksRecommendations() : getMealsRecommendations());
      if (!cancelled) setData((prev) => ({ ...prev, recommendations }));
    })();

    return () => { cancelled = true; };
  }, [id, kind, version, withRecommendations]);

  return data;
}
