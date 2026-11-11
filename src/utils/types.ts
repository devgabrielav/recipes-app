export type RecipeKind = 'meals' | 'drinks';

export type LayoutType = {
  searchResults: SearchResultsType;
  /** Categoria ativa por tipo ('' = todas). */
  category: Record<RecipeKind, string>;
  /** Versão da API em que a lista foi carregada (evita recarregar ao voltar de uma receita). */
  loadedAt: Record<RecipeKind, number | null>;
};

/** Resumo de receita devolvido por busca/filtro/lista da API. */
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
  strAlcoholic?: string,
};
export type MealsDetailsType = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: null | string;
  strMealThumb: string;
} & DetailsCommonKeys;

export type DrinksDetailsType = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate?: null | string;
  strDrinkThumb: string;
  strAlcoholic: string;
} & DetailsCommonKeys;

export type ProductDetailsType = {
  id: string;
  str: string;
  img: string;
} & DetailsCommonKeys;

export type Featured = {
  kind: RecipeKind;
  recipe: ProductDetailsType;
};

export type FavoriteRecipeType = {
  id: string
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string
};

export type DoneRecipeType = FavoriteRecipeType & {
  doneDate: string;
  tags: string[];
};

/** { meals: { [id]: ingredientesMarcados[] }, drinks: { ... } } */
export type InProgressStore = Record<RecipeKind, Record<string, string[]>>;

/** Dados mínimos para exibir um card em "Em andamento" sem chamar a API. */
export type InProgressMeta = {
  name: string;
  image: string;
  category: string;
  total: number;
};

export type LayoutContextType = [
  LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];
