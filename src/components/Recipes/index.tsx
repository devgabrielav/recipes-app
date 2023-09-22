import { SimpleGrid } from '@chakra-ui/react';
import { useContext } from 'react';
import { layoutContext } from '../../context/layout/layoutContext';
import RecipeCard from '../RecipeCard/Index';

export default function Recipes() {
  const [layout] = useContext(layoutContext);
  const { searchResults } = layout;

  return (
    <main>
      <SimpleGrid columns={ 2 } spacing={ 10 }>
        {searchResults.map((obj: any) => (
          <RecipeCard
            key={ obj.idMeal || obj.idDrink }
            recipe={ obj }
          />
        ))}
      </SimpleGrid>
    </main>
  );
}
