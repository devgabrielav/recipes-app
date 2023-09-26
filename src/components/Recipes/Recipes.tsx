import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../SearchBar/RecipeCard';
import { layoutContext } from '../../context/layout/layoutContext';

export type RouteType = {
  recipe: string
};

function Recipes() {
  const [layout, setLayout] = useContext(layoutContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const endpoint = pathname === '/meals'
          ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
          : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

        const response = await fetch(endpoint);
        const data = await response.json();
        setLayout({ searchResults: {
          ...layout.searchResults,
          [pathname.replace('/', '')]: data[`${pathname.replace('/', '')}`],
        } });
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchRecipes();
  }, []);
  if (pathname === '/meals') {
    return (
      <div>
        {layout.searchResults.meals.length > 0 && (
          <RecipeCard recipes={ layout.searchResults.meals } type="meals" />
        )}
      </div>
    );
  }
  return (
    <div>
      {layout.searchResults.drinks.length > 0 && (
        <RecipeCard recipes={ layout.searchResults.drinks } type="drinks" />
      )}
    </div>
  );
}

export default Recipes;
