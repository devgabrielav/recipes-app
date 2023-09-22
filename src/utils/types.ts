export type LayoutType = {
  searchResults: any;
  searchType: string;
  searchValue: string;
};
export type LayoutContextType = [
  LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];
