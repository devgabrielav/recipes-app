import {
  Card,
  Heading,
} from '@chakra-ui/react';
import { MealType, DrinkType } from '../../utils/types';

export type RecipeCardProps = {
  recipes: MealType[] | DrinkType[];
  type: string;
};

export default function RecipeCard({ recipes, type }: RecipeCardProps) {
  const drinksArray = recipes as DrinkType[];
  const mealsArray = recipes as MealType[];
  return (
    <div>
      { type === 'meals' ? (mealsArray.slice(0, 12).map((recipe, index) => (
        <Card key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
          <Heading size="md" data-testid={ `${index}-card-name` }>
            {recipe.strMeal}
          </Heading>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </Card>))) : (drinksArray.slice(0, 12).map((recipe, index) => (
          <Card key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
            <Heading size="md" data-testid={ `${index}-card-name` }>
              {recipe.strDrink}
            </Heading>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </Card>)))}
    </div>
  );
}
