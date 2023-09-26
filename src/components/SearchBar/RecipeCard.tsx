import {
  Card,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RecipeType } from '../../utils/types';

export type RecipeCardProps = {
  recipes: RecipeType[];
  type: string;
};

export default function RecipeCard({ recipes, type }: RecipeCardProps) {
  const drinksArray = recipes as RecipeType[];
  const mealsArray = recipes as RecipeType[];
  return (
    type === 'meals' ? (mealsArray.slice(0, 12).map((recipe, index) => (
      <Card key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
        <Link to={ `/meals/${recipe.idMeal}` }>
          <Heading size="md" data-testid={ `${index}-card-name` }>
            {recipe.strMeal}
          </Heading>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </Link>
      </Card>))) : (drinksArray.slice(0, 12).map((recipe, index) => (
        <Card key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/drinks/${recipe.idDrink}` }>
            <Heading size="md" data-testid={ `${index}-card-name` }>
              {recipe.strDrink}
            </Heading>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </Link>
        </Card>)))
  );
}
