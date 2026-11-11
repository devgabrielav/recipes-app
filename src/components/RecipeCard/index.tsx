import { Link as RouterLink } from 'react-router-dom';
import { AspectRatio, Box, Heading, Link } from '@chakra-ui/react';
import RecipeImage from '../RecipeImage';
import { RecipeType } from '../../utils/types';

type RecipeCardProps = {
  recipe: RecipeType;
  index: number;
  baseHeadTestId?: string;
};

/** Cartão de receita usado nas grades e nas recomendações. */
function RecipeCard({ recipe, index, baseHeadTestId = 'card-name' }: RecipeCardProps) {
  const isMeal = Boolean(recipe.idMeal);
  const id = recipe.idMeal || recipe.idDrink;
  const name = recipe.strMeal || recipe.strDrink || '';

  return (
    <Link
      as={ RouterLink }
      to={ `/${isMeal ? 'meals' : 'drinks'}/${id}` }
      data-testid={ `${index}-recipe-card` }
      display="block"
      h="100%"
      bg="white"
      borderRadius="2xl"
      boxShadow="card"
      overflow="hidden"
      transition="transform .2s ease, box-shadow .2s ease"
      _hover={ { textDecoration: 'none', transform: 'translateY(-4px)', boxShadow: 'lift' } }
    >
      <AspectRatio ratio={ 4 / 3 }>
        <RecipeImage
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ name }
          kind={ isMeal ? 'meal' : 'drink' }
        />
      </AspectRatio>
      <Box p={ { base: 3, md: 4 } }>
        <Heading
          as="h3"
          data-testid={ `${index}-${baseHeadTestId}` }
          size="sm"
          fontFamily="body"
          noOfLines={ 2 }
          minH="2.6em"
        >
          {name}
        </Heading>
      </Box>
    </Link>
  );
}

export default RecipeCard;
