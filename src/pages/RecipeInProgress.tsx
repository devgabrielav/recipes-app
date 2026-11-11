import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Button, Card, Checkbox, Flex, Heading, Progress, Text,
} from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';
import useRecipesDetails from '../hooks/useRecipesDetails';
import useSaveInProgressRecipe from '../hooks/useSaveInProgressRecipe';
import { getIngredientsAndMeasures, splitTags } from '../helper/dataConverters';
import { removeInProgress, saveDoneRecipe, startRecipe } from '../helper/storage';
import Page from '../components/Layout/Page';
import ActionBar from '../components/Layout/ActionBar';
import RecipeHero from '../components/RecipeHero';
import RecipeStatus from '../components/RecipeStatus';
import { useI18n } from '../i18n/I18nProvider';
import { RecipeKind } from '../utils/types';

export default function InProgress() {
  const { recipeDetails, status } = useRecipesDetails(false);
  const { ingredients, measures } = getIngredientsAndMeasures(recipeDetails);
  const { pathname } = useLocation();
  const kind: RecipeKind = pathname.includes('meals') ? 'meals' : 'drinks';
  const { checkeds, onChange } = useSaveInProgressRecipe(recipeDetails?.id, kind);
  const navigate = useNavigate();
  const { t, lang } = useI18n();

  // Garante que a receita apareça na aba "Em andamento", mesmo se a URL foi aberta direto.
  useEffect(() => {
    if (!recipeDetails) return;
    startRecipe(kind, recipeDetails.id, {
      name: recipeDetails.str,
      image: recipeDetails.img,
      category: recipeDetails.strCategory || '',
      total: getIngredientsAndMeasures(recipeDetails).ingredients.length,
    });
  }, [recipeDetails?.id, kind]);

  if (!recipeDetails) {
    return <Page><RecipeStatus status={ status } /></Page>;
  }

  const total = ingredients.length;
  const done = ingredients.filter((i) => checkeds[i]).length;
  const finished = total > 0 && done === total;

  const finish = () => {
    saveDoneRecipe({
      id: recipeDetails.id,
      type: kind === 'meals' ? 'meal' : 'drink',
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory || '',
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails.str,
      image: recipeDetails.img,
      doneDate: new Date().toISOString(),
      tags: splitTags(recipeDetails.strTags),
    });
    removeInProgress(kind, recipeDetails.id);
    navigate('/done-recipes');
  };

  return (
    <Page bare withActionBar>
      <Box maxW="1200px" mx="auto" px={ { base: 4, md: 6 } } pt={ { base: 5, md: 8 } }>
        <RecipeHero recipe={ recipeDetails } kind={ kind } />

        <Card p={ { base: 5, md: 6 } } borderRadius="2xl" boxShadow="card" maxW="760px">
          <Flex justify="space-between" align="baseline" mb={ 2 } gap={ 3 }>
            <Heading as="h2" size="md">{t('ingredients')}</Heading>
            <Text
              fontWeight={ 700 }
              color={ finished ? 'basil.600' : 'ink.400' }
              data-testid="progress-label"
            >
              {finished ? t('progressDone') : t('progressOf', { done, total })}
            </Text>
          </Flex>
          <Progress
            value={ total ? (done / total) * 100 : 0 }
            colorScheme={ finished ? 'basil' : 'brand' }
            borderRadius="full"
            size="sm"
            mb={ 4 }
            aria-label={ t('progressOf', { done, total }) }
          />
          <Flex direction="column" gap={ 1 }>
            {ingredients.map((ingredient, index) => {
              const checked = Boolean(checkeds[ingredient]);
              return (
                <Checkbox
                  key={ `${ingredient}-${index}` }
                  data-testid={ `${index}-ingredient-step` }
                  isChecked={ checked }
                  onChange={ () => onChange(ingredient) }
                  colorScheme="basil"
                  size="lg"
                  py={ 2 }
                  px={ 2 }
                  borderRadius="lg"
                  _hover={ { bg: 'cream.200' } }
                  sx={ { '.chakra-checkbox__label': { flex: 1 } } }
                >
                  <Flex justify="space-between" gap={ 3 }>
                    <Text
                      as="span"
                      textDecoration={ checked ? 'line-through' : 'none' }
                      color={ checked ? 'ink.300' : 'ink.500' }
                    >
                      {ingredient}
                    </Text>
                    <Text as="span" color="ink.300" fontSize="sm" textAlign="right">
                      {measures[index]}
                    </Text>
                  </Flex>
                </Checkbox>
              );
            })}
          </Flex>
        </Card>

        <Card p={ { base: 5, md: 6 } } borderRadius="2xl" boxShadow="card" mt={ 6 } maxW="760px">
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
      </Box>

      <ActionBar hint={ finished ? undefined : t('finishHint') }>
        <Button
          data-testid="finish-recipe-btn"
          size="lg"
          w="100%"
          colorScheme="basil"
          leftIcon={ <FiCheck /> }
          isDisabled={ !finished }
          onClick={ finish }
        >
          {t('finishRecipe')}
        </Button>
      </ActionBar>
    </Page>
  );
}
