export type LayoutType = {
  searchValue: string;
  searchType: string;
};

type RecipeType = {
  id: string;
  name: string;
  imageURL: string;
};

export type SearchResultsType = {
  meals: RecipeType[];
  drinks: RecipeType[];
};
