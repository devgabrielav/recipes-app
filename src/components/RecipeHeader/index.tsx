import { Center, Img, Button, Text, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipesDetails from '../../hooks/useRecipesDetails';
import { FavoriteRecipeType } from '../../utils/types';
import { saveToFavorites } from '../../helper/useLocalStorage';
import shareIcon from '../../images/shareIcon.svg';
import fullHeartIcon from '../../images/blackHeartIcon.svg';
import emptyHeartIcon from '../../images/whiteHeartIcon.svg';

export default function RecipeHeader() {
  const { recipeDetails } = useRecipesDetails();
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [maybeFavorite, setMaybeFavorite] = useState<FavoriteRecipeType>({
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
  });
  const { pathname } = useLocation();

  useEffect(() => {
    setMaybeFavorite({
      id: recipeDetails?.id || '',
      type: pathname.includes('meals') ? 'meal' : 'drink',
      nationality: recipeDetails?.strArea || '',
      category: recipeDetails?.strCategory || '',
      alcoholicOrNot: pathname
        .includes('drinks') ? recipeDetails?.strAlcoholic || '' : '',
      name: recipeDetails?.str || '',
      image: recipeDetails?.img || '',
    });
    const isFavorited: FavoriteRecipeType[] = JSON.parse(localStorage
      .getItem('favoriteRecipes') || '[]')
      .find(
        (recipe: FavoriteRecipeType) => (
          recipe.id === recipeDetails?.id
        ),
      );
    if (isFavorited) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [recipeDetails, pathname]);

  const copyLink = () => {
    const URL = window.location.href;
    navigator.clipboard.writeText(URL);
    setShowCopyMessage(true);
  };

  const saveFavAndChangeIcon = () => {
    saveToFavorites(maybeFavorite);
    const isFavorited: FavoriteRecipeType[] = JSON.parse(localStorage
      .getItem('favoriteRecipes') || '[]')
      .find(
        (recipe: FavoriteRecipeType) => (
          recipe.id === recipeDetails?.id
        ),
      );
    if (isFavorited) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  if (!recipeDetails) return <div>Loading...</div>;
  return (
    <Center marginTop="20px" flexDirection="column" gap={ 4 }>
      <Img
        src={ recipeDetails.img }
        alt={ recipeDetails.str }
        height={ 162 }
        data-testid="recipe-photo"
      />
      <Box>
        <Button data-testid="share-btn" onClick={ copyLink } variant="ghost">
          <Img src={ shareIcon } alt="share" />
        </Button>
        <Button onClick={ saveFavAndChangeIcon } variant="ghost">
          <Img
            src={ isFavorite ? fullHeartIcon : emptyHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
          />
        </Button>
        {showCopyMessage && <Text fontSize="sm">Link copied!</Text>}
      </Box>
    </Center>
  );
}
