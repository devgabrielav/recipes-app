import { Center, Heading, Img, UnorderedList, ListItem, Card,
  Container, SimpleGrid, Button,
  Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useRecipesDetails from '../hooks/useRecipesDetails';
import { getIngredientsAndMeasures } from '../helper/dataConverters';
import RecipeCard from '../components/RecipeCard';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeDetails() {
  const { recipeDetails, recommendations } = useRecipesDetails();
  const [showCopyMessage, setShowCopyMessage] = useState(false);
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
    const inProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes') || '{}');
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      pathname.includes('/meals') ? {
        ...inProgress,
        meals: {
          ...inProgress.meals,
          [recipeDetails.id]: ingredients.map((ingredient) => ingredient),
        },
      } : {
        ...inProgress,
        drinks: {
          ...inProgress.drinks,
          [recipeDetails.id]: ingredients.map((ingredient) => ingredient),
        },
      },
    ));
    setInProgressRecipe(true);
    navigate(`${pathname}/in-progress`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setShowCopyMessage(true);
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
        <Center marginTop="20px">
          <Img
            src={ recipeDetails.img }
            alt={ recipeDetails.str }
            height={ 162 }
            data-testid="recipe-photo"
          />
          <Button data-testid="share-btn" onClick={ copyLink }>
            <Img src={ shareIcon } alt="share" />
          </Button>
          <Button data-testid="favorite-btn">
            <Img src={ heartIcon } alt="favorite" />
          </Button>
          {showCopyMessage && <Text fontSize="sm">Link copied!</Text>}
        </Center>
        <Center flexDirection="column">
          <Heading data-testid="recipe-title">{ recipeDetails.str }</Heading>
          <Text data-testid="recipe-category">{ recipeDetails.strCategory }</Text>
        </Center>
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
        <Heading>Instructions</Heading>
        <Card padding={ 4 }>
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        </Card>
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
      {/* inProgressRecipe && (
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px', backgroundColor: 'yellow' } }
        >
          Continue Recipe
        </button>
      )}
      {         <Center margin={ 4 }>
          </Center>      <Button
            colorScheme="yellow"
            data-testid="start-recipe-btn"
            color="white"
            width="100%"
            position="fixed"
            bottom="0px"
            borderRadius={ 0 }
            maxW="360px"
            maxH="640px"
          >
            Continue Recipe
          </Button> */}

    </>
  );
}
