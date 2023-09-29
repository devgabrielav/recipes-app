import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Link,
} from '@chakra-ui/react';
import { Link as DomLink, useLocation } from 'react-router-dom';
import { RecipeType } from '../../utils/types';

type RecipeCardProps = {
  recipe: RecipeType;
  index: number;
  baseHeadTestId?: string;
} & React.ComponentProps<typeof Card>;

function RecipeCard({ recipe, index, baseHeadTestId = 'card-name' }: RecipeCardProps) {
  const { pathname } = useLocation();
  return (
    <Card
      data-testid={ `${index}-recipe-card` }
      maxW="360px"
      maxH="640px"
      alignItems="center"
    >
      <Link as={ DomLink } to={ `${pathname}/${recipe.idMeal || recipe.idDrink}` }>
        <CardBody>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <Heading
            data-testid={ `${index}-${baseHeadTestId}` }
            size="md"
          >
            <CardHeader>
              {recipe.strMeal || recipe.strDrink }
            </CardHeader>
          </Heading>
        </CardBody>
      </Link>
    </Card>
  );
}

export default RecipeCard;
