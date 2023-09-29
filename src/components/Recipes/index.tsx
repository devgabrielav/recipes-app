import { SimpleGrid } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { layoutContext } from '../../context/layout/layoutContext';
import RecipeCard from '../RecipeCard';
import { fetchAllRecipes } from '../../helper/helpersAPI';

export default function Recipes() {
  const [layout, setLayout] = useContext(layoutContext);
  const { searchResults } = layout;
  const { pathname } = useLocation();

  useEffect(() => {
    const initialFetch = async () => {
      const data = await fetchAllRecipes(pathname);
      setLayout({ searchResults: {
        ...layout.searchResults,
        [pathname.replace('/', '')]: data,
      } });
    };
    initialFetch();
  }, []);

  return (
    <main style={ { margin: 'auto', display: 'flex', width: '360px', height: '640px' } }>
      <SimpleGrid columns={ 2 } spacing={ 3 }>
        {pathname === '/meals' && searchResults.meals.length > 0 && (
          searchResults.meals.slice(0, 12).map((meal, index) => (
            <RecipeCard
              index={ index }
              key={ meal.idMeal }
              recipe={ meal }
              data-testid={ `${meal.idMeal}-recipe-card` }
            />
          ))
        ) }
        {pathname === '/drinks' && searchResults.drinks.length > 0
        && (
          searchResults.drinks.slice(0, 12).map((drink, index) => (
            <RecipeCard
              index={ index }
              key={ drink.idDrink }
              recipe={ drink }
              data-testid={ `${drink.idDrink}-recipe-card` }
            />
          ))
        )}
      </SimpleGrid>
    </main>
  );
}
