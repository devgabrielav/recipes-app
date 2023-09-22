import {
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';

export default function RecipeCard(props) {
  const { recipe } = props;
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{recipe.strMeal || recipe.strDrink}</Heading>
      </CardHeader>
      <CardBody>
        <img
          src={recipe.strMealThumb || recipe.strDrinkThumb}
          alt={recipe.strMeal || recipe.strDrink}
        />
      </CardBody>
    </Card>
  );
}
