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
} & React.ComponentProps<typeof Card>;

export default function RecipeCard({ recipe, index }: RecipeCardProps) {
  console.log(recipe.idDrink || recipe.idMeal);
  return (
    <Card data-testid={ `${index}-recipe-card` }>

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
    </Card>
  );
}
