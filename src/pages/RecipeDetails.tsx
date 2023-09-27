import { Center, Heading, Img, UnorderedList, ListItem, Card,
  Container, SimpleGrid, Button,
  Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useRecipesDetails from '../hooks/useRecipesDetails';
import { getIngredientsAndMeasures } from '../helper/dataConverters';
import RecipeCard from '../components/RecipeCard';

export default function RecipeDetails() {
  const { recipeDetails, recommendations } = useRecipesDetails();
  const [startedRecipe, setStartedRecipe] = useState(false);
  const [sliceValue, setSliceValue] = useState(0);

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
  if (!recipeDetails) return (<div>Loading...</div>);

  const { ingredients, measures } = getIngredientsAndMeasures(recipeDetails);
  const startRecipe = () => {
    setStartedRecipe(true);
  };

  return (
    <>
      <Container>
        <Center flexDirection="column">
          <Img
            src={ recipeDetails.img }
            alt={ recipeDetails.str }
            height={ 162 }
            data-testid="recipe-photo"
          />
          <Heading data-testid="recipe-title">{ recipeDetails.str }</Heading>
          <Text data-testid="recipe-category">{ recipeDetails.strCategory }</Text>
        </Center>
        <Center>
          <Heading>Ingredients</Heading>
        </Center>
        <Card>
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
        <Heading>Instructions</Heading>
        <Card padding={ 4 }>
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        </Card>
        {recipeDetails.strYoutube && (
          <>
            <Heading>Video</Heading>
            <Card>
              <Center>
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

      {!startedRecipe
      && (
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
          >
            Start Recipe
          </Button>
        </Center>
      )}
    </>
  );
}
