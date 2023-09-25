export type LayoutType = {
  searchResults: SearchResultsType;
};

export type RecipeType = {
  id: string;
  name: string;
  imageURL: string;
};

export type SearchResultsType = {
  meals: RecipeType[];
  drinks: RecipeType[];
};

export type LayoutContextType = [
  LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];
