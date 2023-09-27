export type LayoutType = {
  searchResults: SearchResultsType;
};

export type RecipeType = {
  idMeal?: string;
  idDrink?: string;
  strMeal?: string;
  strDrink?: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
};

export type SearchResultsType = {
  meals: RecipeType[];
  drinks: RecipeType[];
};

type DetailsCommonKeys = {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string;
  strYoutube: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};
export type MealsDetailsType = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: null | string;
  strMealThumb: string;
} & DetailsCommonKeys;

export type DrinksDetailsType = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: null | string;
  strMealThumb: string;
  strAlcoholic: string;
} & DetailsCommonKeys;

export type ProductDetailsType = {
  id: string;
  str: string;
  img: string;
} & DetailsCommonKeys;

export type LayoutContextType = [
  LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];
