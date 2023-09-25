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

export type LayoutContextType = [
  LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];
