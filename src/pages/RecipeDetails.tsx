import { Center, Heading, UnorderedList, ListItem, Card,
  Container, SimpleGrid, Button,
  Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useRecipesDetails from '../hooks/useRecipesDetails';
import { getIngredientsAndMeasures } from '../helper/dataConverters';
import { saveToStartRecipe } from '../helper/useLocalStorage';
import RecipeCard from '../components/RecipeCard';
import RecipeLayout from '../components/RecipeLayout';

export default function RecipeDetails() {
  const { recipeDetails, recommendations } = useRecipesDetails();
  const [sliceValue, setSliceValue] = useState(0);
  const { pathname } = useLocation();
  const [inProgressRecipe, setInProgressRecipe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const test = setInterval(() => {
      setSliceValue((prev) => {
        return (prev === 4 ? 0 : prev + 2);
      });
    }, 2000);
    return () => {
      clearInterval(test);
    };
  }, [setSliceValue, sliceValue]);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const matchIdDrink = Object.keys(inProgress.drinks || '')
      .find((drinkId) => drinkId === recipeDetails?.id);
    const matchIdMeal = Object.keys(inProgress.meals || '')
      .find((mealId) => mealId === recipeDetails?.id);
    if (matchIdDrink || matchIdMeal) {
      setInProgressRecipe(true);
    }
  }, [recipeDetails?.id]);

  if (!recipeDetails) return (<div>Loading...</div>);

  const { ingredients, measures } = getIngredientsAndMeasures(recipeDetails);

  const startRecipe = () => {
    saveToStartRecipe(recipeDetails, ingredients, pathname);
    setInProgressRecipe(true);
    navigate(`${pathname}/in-progress`);
  };

  return (
    <>
      <Container
        maxW="360px"
        maxH="640px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <RecipeLayout>
          <Center>
            <Heading>Ingredients</Heading>
          </Center>
          <Card
            padding={ 4 }
            width="100%"
            maxW="360px"
            maxH="640px"
          >
            <UnorderedList>
              {ingredients.map((ingredient, index) => (
                <ListItem key={ ingredient }>
                  <Text
                    display="inline-block"
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    marginInline={ 2 }
                  >
                    {ingredient}
                  </Text>
                  <Text
                    display="inline-block"
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {measures[index]}
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Card>
        </RecipeLayout>
        {recipeDetails.strYoutube && (
          <>
            <Heading>Video</Heading>
            <Card>
              <Center
                maxW="360px"
                maxH="640px"
              >
                <iframe
                  title="video"
                  width="352"
                  height="198"
                  src={ recipeDetails.strYoutube.replace('watch?v=', 'embed/') }
                  data-testid="video"
                />
              </Center>
            </Card>
          </>
        )}

        <Heading>Recommended</Heading>
        <Card>

          <SimpleGrid columns={ 2 }>
            {
            recommendations.map((recommendation, index) => (
              <Container
                data-testid={ `${index}-recommendation-card` }
                key={ recommendation.idDrink || recommendation.idMeal }
                display={ ((index <= sliceValue + 1) && (index >= sliceValue))
                  ? 'block' : 'none' }
              >

                <RecipeCard
                  maxH={ 10 }
                  maxW={ 10 }
                  recipe={ recommendation }
                  index={ index }
                  baseHeadTestId="recommendation-title"
                  margin={ 4 }
                />
              </Container>
            ))
        }
          </SimpleGrid>
        </Card>
      </Container>
      <Center margin={ 4 }>
        <Button
          data-testid="start-recipe-btn"
          colorScheme="yellow"
          color="white"
          width="100%"
          position="fixed"
          bottom="0px"
          borderRadius={ 0 }
          onClick={ startRecipe }
          maxW="360px"
          maxH="640px"
        >
          {inProgressRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </Button>
      </Center>
    </>
  );
}
