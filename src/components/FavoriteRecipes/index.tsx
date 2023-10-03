import { useEffect, useState } from 'react';
import { Box, Flex, Button, Image, Text, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FavoriteRecipeType } from '../../utils/types';
import Header from '../Header';
import shareIcon from '../../images/shareIcon.svg';
import heart from '../../images/blackHeartIcon.svg';
import { saveToFavorites } from '../../helper/useLocalStorage';

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState<FavoriteRecipeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const favRecipesLocal = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavRecipes(favRecipesLocal);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (<h1>Loading...</h1>);
  }

  const removeFav = (recipe: FavoriteRecipeType) => {
    saveToFavorites(recipe);
    const favRecipesLocal = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavRecipes(favRecipesLocal);
  };

  const copyLink = (pathname: string) => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopyMessage(true);
  };

  const filterFood = () => {
    const favRecipesLocal = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavRecipes(favRecipesLocal
      .filter((recipe: FavoriteRecipeType) => recipe.type === 'meal'));
  };

  const filterDrink = () => {
    const favRecipesLocal = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavRecipes(favRecipesLocal
      .filter((recipe: FavoriteRecipeType) => recipe.type === 'drink'));
  };

  const setAll = () => {
    const favRecipesLocal = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavRecipes(favRecipesLocal);
  };

  return (
    <>
      <Header />
      <Box p={ 4 }>
        <Flex mb={ 4 }>
          <Button data-testid="filter-by-all-btn" mr={ 2 } onClick={ setAll }>
            All
          </Button>
          <Button data-testid="filter-by-meal-btn" mr={ 2 } onClick={ filterFood }>
            Meals
          </Button>
          <Button data-testid="filter-by-drink-btn" onClick={ filterDrink }>
            Drinks
          </Button>
        </Flex>

        {favRecipes.map((recipe, index) => (
          <Box
            key={ index }
            borderWidth="1px"
            borderRadius="lg"
            p={ 4 }
            mb={ 4 }
            display="flex"
            flexDirection="column"
          >
            <Link
              to={ recipe.type === 'meal' ? (
                `/meals/${recipe.id}`) : (`/drinks/${recipe.id}`) }
            >
              <Image
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                maxW="200px"
                mb={ 2 }
              />
            </Link>
            <Text>
              {recipe.type === 'meal' ? (
                <Badge
                  data-testid={ `${index}-horizontal-top-text` }
                  colorScheme="gray"
                >
                  {recipe.nationality}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </Badge>
              ) : (
                <Badge
                  data-testid={ `${index}-horizontal-top-text` }
                  colorScheme="gray"
                >
                  {recipe.alcoholicOrNot}
                </Badge>
              )}
            </Text>
            <Link
              to={ recipe.type === 'meal' ? (
                `/meals/${recipe.id}`) : (`/drinks/${recipe.id}`) }
            >
              <Text
                data-testid={ `${index}-horizontal-name` }
                fontWeight="bold"
                fontSize="lg"
                mt={ 2 }
              >
                {recipe.name}
              </Text>
            </Link>
            <Button mt={ 2 } onClick={ () => removeFav(recipe) }>
              <Image
                src={ heart }
                alt="Favorite"
                w={ 4 }
                h={ 4 }
                mr={ 2 }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
              Favorite
            </Button>
            <Button
              mt={ 2 }
              as="button"
              onClick={ () => copyLink(recipe.type === 'meal' ? (
                `/meals/${recipe.id}`) : (`/drinks/${recipe.id}`)) }
            >
              <Image
                src={ shareIcon }
                alt="Share"
                w={ 4 }
                h={ 4 }
                mr={ 2 }
                data-testid={ `${index}-horizontal-share-btn` }
              />
              Share
            </Button>
            {copyMessage && <p>Link copied!</p>}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default FavoriteRecipes;
