import {
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { RecipeType } from '../../utils/types';

type RecipeCardProps = {
  recipe: RecipeType;
  index: number;
} & React.ComponentProps<typeof Card>;

export default function RecipeCard({ recipe, index }: RecipeCardProps) {
  const { pathname } = useLocation();
  return (
    <Card data-testid={ `${index}-recipe-card` }>
      <Link to={ `${pathname}/${recipe.idDrink || recipe.idMeal}` }>
        <CardHeader>
          <Heading
            data-testid={ `${index}-card-name` }
            size="md"
          >
            {recipe.strMeal || recipe.strDrink }
          </Heading>
        </CardHeader>
        <CardBody>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
        </CardBody>
      </Link>
    </Card>
  );
}
