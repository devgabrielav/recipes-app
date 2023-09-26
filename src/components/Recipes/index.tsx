import { SimpleGrid } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { layoutContext } from '../../context/layout/layoutContext';
import RecipeCard from '../RecipeCard';

export default function Recipes() {
  const [layout] = useContext(layoutContext);
  const { searchResults } = layout;
  const location = useLocation();

  return (
    <main>
      <SimpleGrid columns={ 2 } spacing={ 10 }>
        {location.pathname === '/meals' && searchResults.meals.length > 0 && (
          searchResults.meals.slice(0, 12).map((meal, index) => (
            <RecipeCard
              index={ index }
              key={ meal.idMeal }
              recipe={ meal }
              data-testid={ `${meal.idMeal}-recipe-card` }
            />
          ))
        ) }
        {location.pathname === '/drinks' && searchResults.drinks.length > 0
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
