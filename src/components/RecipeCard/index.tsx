import {
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';
import { RecipeType } from '../../utils/types';

type RecipeCardProps = {
  recipe: RecipeType;
  index: number;
  baseHeadTestId?: string;
} & React.ComponentProps<typeof Card>;

function RecipeCard({ recipe, index, baseHeadTestId = 'card-name' }: RecipeCardProps) {
  return (
    <Card data-testid={ `${index}-recipe-card` }>
      <CardHeader>
        <Heading
          data-testid={ `${index}-${baseHeadTestId}` }
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
    </Card>
  );
}

export default RecipeCard;
