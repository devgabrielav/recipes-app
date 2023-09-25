import {
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';

export default function RecipeCard(props: any) {
  const { recipe, index } = props;

  return (
    <Card>
      <CardHeader>
        <Heading
          data-testid={ `${index} - card-name` }
          size="md"
        >
          {recipe.strMeal || recipe.strDrink }
        </Heading>
      </CardHeader>
      <CardBody>
        <img
          data-testid={ `${index} - card-img` }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
        />
      </CardBody>
    </Card>
  );
}
