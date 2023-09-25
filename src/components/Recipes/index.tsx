import { SimpleGrid } from '@chakra-ui/react';
import { useContext } from 'react';
import { layoutContext } from '../../context/layout/layoutContext';
import RecipeCard from '../RecipeCard';

export default function Recipes() {
  const [layout] = useContext(layoutContext);
  const { searchResults } = layout;
  console.log(searchResults);

  return (
    <main>
      <SimpleGrid columns={ 2 } spacing={ 10 }>
        {searchResults.meals.length > 0
        && searchResults.meals.slice(0, 12).map((meal) => (
          <RecipeCard
            key={ meal.id }
            recipe={ meal }
            data-testid={ `${meal.id}-recipe-card` }
          />
        ))}
        {searchResults.drinks.length > 0
        && searchResults.drinks.slice(0, 12).map((drink) => (
          <RecipeCard
            key={ drink.id }
            recipe={ drink }
            data-testid={ `${drink.id}-recipe-card` }
          />
        ))}
      </SimpleGrid>
    </main>
  );
}
