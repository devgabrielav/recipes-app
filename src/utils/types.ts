export type LayoutType = {
  searchResults: any;
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
export type LayoutContextType = [
  LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];
