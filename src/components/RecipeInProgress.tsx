import { Box, Button, Card, Center, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipeLayout from './RecipeLayout';
import useRecipesDetails from '../hooks/useRecipesDetails';
import { getIngredientsAndMeasures } from '../helper/dataConverters';
import useSaveInProgressRecipe from '../hooks/useSaveInProgressRecipe';

export default function InProgress() {
  const { recipeDetails } = useRecipesDetails();
  const { ingredients, measures } = getIngredientsAndMeasures(recipeDetails);
  const { checkeds, onChange } = useSaveInProgressRecipe(recipeDetails?.id);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const checkedValues = Object.values(checkeds);
  const finish = checkedValues.length === ingredients.length
    && checkedValues.every((value) => value === true)
    && checkedValues.length > 0;

  const saveToDoneAndNavigate = () => {
    const tagsArray = recipeDetails?.strTags === null ? [] : recipeDetails?.strTags
      .split(',');
    const now = new Date();
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    localStorage.setItem('doneRecipes', JSON.stringify([
      ...doneRecipesLocal,
      {
        id: recipeDetails?.id,
        type: pathname.includes('meals') ? 'meal' : 'drink',
        nationality: recipeDetails?.strArea || '',
        category: recipeDetails?.strCategory || '',
        alcoholicOrNot: recipeDetails?.strAlcoholic || '',
        name: recipeDetails?.str,
        image: recipeDetails?.img,
        doneDate: now,
        tags: tagsArray,
      },
    ]));

    navigate('/done-recipes');
  };

  if (!recipeDetails) return (<div>Loading...</div>);
  return (
    <>
      <RecipeLayout>
        <Box maxW="360px" w="100%" padding={ 2 }>

          <Card
            w="100%"
            colorScheme="gray"
            paddingLeft={ 2 }
          >
            {ingredients.map((ingredient, index) => (
              <Box key={ ingredient }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  style={ checkeds[ingredient] ? (
                    { textDecoration: 'line-through solid rgb(0, 0, 0)' }) : (
                    { textDecoration: 'none' }) }
                >
                  <input
                    type="checkbox"
                    defaultChecked={ checkeds[ingredient] }
                    onChange={ () => { onChange(ingredient); } }
                  />
                  {ingredient}
                </label>
                <Text
                  display="inline-block"
                  color="rgb(0,0,0)"
                  textDecoration={
                    checkeds[ingredient] ? 'line-through solid rgb(0, 0, 0)' : 'none'
}
                >
                  {measures[index]}
                </Text>
              </Box>
            ))}
          </Card>
        </Box>
      </RecipeLayout>
      <Center paddingBottom={ 20 }>
        <Button
          data-testid="finish-recipe-btn"
          w="80%"
          position="fixed"
          bottom="0"
          margin={ 2 }
          colorScheme="yellow"
          color="white"
          isDisabled={ !finish }
          onClick={ saveToDoneAndNavigate }
          display={ finish ? 'block' : 'none' }
        >
          Finish Recipe
        </Button>
      </Center>
    </>
  );
}
