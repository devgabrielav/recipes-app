import { Box, Button, Card, Center, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import RecipeLayout from '../components/RecipeLayout';
import useRecipesDetails from '../hooks/useRecipesDetails';
import { getIngredientsAndMeasures } from '../helper/dataConverters';
import useSaveInProgressRecipe from '../hooks/useSaveInProgressRecipe';

export default function InProgress() {
  const { recipeDetails } = useRecipesDetails();
  const { ingredients, measures } = getIngredientsAndMeasures(recipeDetails);
  const { checkeds, onChange } = useSaveInProgressRecipe(recipeDetails?.id);
  const navigate = useNavigate();

  const checkedValues = Object.values(checkeds);
  const finish = checkedValues.length === ingredients.length
   && checkedValues.every((value) => value === true)
   && checkedValues.length > 0;

  console.log(recipeDetails);

  if (!recipeDetails) return (<div>Loading...</div>);
  return (
    <>
      <RecipeLayout>
        <Box maxW="360px" w="100%" padding={ 2 }>

          <Card
            w="100%"
            colorScheme="gray"
            paddingLeft={ 2 }
            data-testid="ingredient-step"
            textDecoration="line-through solid rgb(0, 0, 0)"
          >
            {ingredients.map((ingredient, index) => (
              <Box key={ ingredient }>
                <Text
                  display="inline-block"
                  marginInline={ 2 }
                  color="rgb(0,0,0)"
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    defaultChecked={ checkeds[ingredient] }
                    onChange={ () => { onChange(ingredient); } }
                  />
                  {ingredient}
                </Text>
                <Text
                  display="inline-block"
                  color="rgb(0,0,0)"
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
          onClick={ () => navigate('/done-recipes') }
          display={ finish ? 'block' : 'none' }
        >
          Finish Recipe
        </Button>
      </Center>
    </>
  );
}
