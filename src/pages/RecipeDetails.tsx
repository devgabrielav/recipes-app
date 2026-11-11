import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AspectRatio, Box, Button, Card, Flex, Grid, Heading, ListItem, Text, UnorderedList,
} from '@chakra-ui/react';
import { FiPlay } from 'react-icons/fi';
import useRecipesDetails from '../hooks/useRecipesDetails';
import { getIngredientsAndMeasures } from '../helper/dataConverters';
import { isInProgress, startRecipe } from '../helper/storage';
import { kindFromPath } from '../helper/helpersAPI';
import Page from '../components/Layout/Page';
import ActionBar from '../components/Layout/ActionBar';
import RecipeHero from '../components/RecipeHero';
import RecipeStatus from '../components/RecipeStatus';
import Recommendations from '../components/Recommendations';
import { useI18n } from '../i18n/I18nProvider';

export default function RecipeDetails() {
  const { recipeDetails, recommendations, status } = useRecipesDetails();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const kind = kindFromPath(pathname);
  const [started, setStarted] = useState<string | null>(null);

  if (!recipeDetails) return <Page><RecipeStatus status={ status } /></Page>;

  const { ingredients, measures } = getIngredientsAndMeasures(recipeDetails);
  const inProgress = started === recipeDetails.id || isInProgress(kind, recipeDetails.id);

  const start = () => {
    startRecipe(kind, recipeDetails.id, {
      name: recipeDetails.str,
      image: recipeDetails.img,
      category: recipeDetails.strCategory || '',
      total: ingredients.length,
    });
    setStarted(recipeDetails.id);
    navigate(`/${kind}/${recipeDetails.id}/in-progress`);
  };

  return (
    <Page bare withActionBar>
      <Box maxW="1200px" mx="auto" px={ { base: 4, md: 6 } } pt={ { base: 5, md: 8 } }>
        <RecipeHero recipe={ recipeDetails } kind={ kind } />

        <Grid templateColumns={ { base: '1fr', lg: '5fr 7fr' } } gap={ 6 } alignItems="start">
          <Card p={ { base: 5, md: 6 } } borderRadius="2xl" boxShadow="card">
            <Heading as="h2" size="md" mb={ 3 }>{t('ingredients')}</Heading>
            <UnorderedList spacing={ 2 } ml={ 5 }>
              {ingredients.map((ingredient, index) => (
                <ListItem key={ `${ingredient}-${index}` }>
                  <Flex justify="space-between" gap={ 3 }>
                    <Text as="span" data-testid={ `${index}-ingredient-name-and-measure` }>
                      {ingredient}
                    </Text>
                    <Text as="span" color="ink.300" textAlign="right">{measures[index]}</Text>
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>
          </Card>

          <Card p={ { base: 5, md: 6 } } borderRadius="2xl" boxShadow="card">
            <Heading as="h2" size="md" mb={ 3 }>{t('instructions')}</Heading>
            <Text data-testid="instructions" whiteSpace="pre-line" lineHeight="tall">
              {recipeDetails.strInstructions}
            </Text>
            {lang === 'pt' && (
              <Text mt={ 4 } fontSize="sm" color="ink.300" fontStyle="italic">
                {t('instructionsNote')}
              </Text>
            )}
          </Card>
        </Grid>

        {recipeDetails.strYoutube && (
          <Box mt={ 6 }>
            <Heading as="h2" size="md" mb={ 3 }>{t('video')}</Heading>
            <AspectRatio ratio={ 16 / 9 } maxW="760px" borderRadius="2xl" overflow="hidden">
              <iframe
                title={ t('video') }
                src={ recipeDetails.strYoutube.replace('watch?v=', 'embed/') }
                data-testid="video"
                loading="lazy"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        )}

        <Recommendations recipes={ recommendations } />
      </Box>

      <ActionBar>
        <Button
          data-testid="start-recipe-btn"
          size="lg"
          w="100%"
          leftIcon={ <FiPlay /> }
          onClick={ start }
        >
          {inProgress ? t('continueRecipe') : t('startRecipe')}
        </Button>
      </ActionBar>
    </Page>
  );
}
