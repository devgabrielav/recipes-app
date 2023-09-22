import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { layoutContext } from '../context/layout/layoutContext';
import { searchMealsAPI, searchCocktailsAPI } from '../helper/helpersAPI';

export default function useExecuteSearch() {
  const { pathname } = useLocation();
  const setLayout = useContext(layoutContext)[1];

  return async (searchOption: string, searchInput: string) => {
    if (searchOption === 'first-letter' && searchInput.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }
    if (pathname === '/meals') {
      const data = await searchMealsAPI(searchOption, searchInput);
      setLayout((prev) => ({ ...prev, searchResults: (data.meals || []) }));
    } else if (pathname === '/drinks') {
      const data = await searchCocktailsAPI(searchOption, searchInput);
      setLayout((prev) => ({ ...prev, searchResults: (data.drinks || []) }));
    }
  };
}
