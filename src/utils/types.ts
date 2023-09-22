export type LayoutType = {
  searchValue: string;
  searchType: string;
};
export type LayoutContextType = [
  LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];
