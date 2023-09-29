import { FavoriteRecipeType, ProductDetailsType } from '../utils/types';

const saveToFavorites = (recipeFav: FavoriteRecipeType) => {
  const favorites: FavoriteRecipeType[] = JSON.parse(localStorage
    .getItem('favoriteRecipes') || '[]');
  const isInFavorites = favorites.find((recipe) => recipe.id === recipeFav.id);
  if (isInFavorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites.filter((recipe) => (
      recipe.id !== recipeFav.id
    ))));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...favorites,
        recipeFav,
      ],
    ));
  }
};

const saveToStartRecipe = (
  recipeStart: ProductDetailsType,
  ingredients: string[],
  pathname: string,
) => {
  const inProgress = JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{}');
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    pathname.includes('/meals') ? {
      ...inProgress,
      meals: {
        ...inProgress.meals,
        [recipeStart.id]: ingredients.map((ingredient) => ingredient),
      },
    } : {
      ...inProgress,
      drinks: {
        ...inProgress.drinks,
        [recipeStart.id]: ingredients.map((ingredient) => ingredient),
      },
    },
  ));
};

export { saveToFavorites, saveToStartRecipe };
