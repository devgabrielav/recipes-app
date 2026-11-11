import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AspectRatio, Box, Button, Flex, Heading, IconButton, Progress, SimpleGrid, Text, useToast,
} from '@chakra-ui/react';
import { FiArrowRight, FiClock, FiTrash2 } from 'react-icons/fi';
import Page from '../components/Layout/Page';
import EmptyState from '../components/EmptyState';
import RecipeImage from '../components/RecipeImage';
import TypeBadge from '../components/TypeBadge';
import { getDrinkById, getMealById } from '../helper/helpersAPI';
import { getIngredientsAndMeasures, ProductDetailsConverter } from '../helper/dataConverters';
import {
  getInProgress, getInProgressMeta, removeInProgress, startRecipe,
} from '../helper/storage';
import { useI18n } from '../i18n/I18nProvider';
import { InProgressMeta, RecipeKind } from '../utils/types';

type Entry = { kind: RecipeKind; id: string };

const listEntries = (): Entry[] => {
  const store = getInProgress();
  return (['meals', 'drinks'] as RecipeKind[]).flatMap((kind) => (
    Object.keys(store[kind]).map((id) => ({ kind, id }))));
};

function InProgressCard({ entry, index, onDiscard }: {
  entry: Entry;
  index: number;
  onDiscard: () => void;
}) {
  const { t, category } = useI18n();
  const { kind, id } = entry;
  const [meta, setMeta] = useState<InProgressMeta | null>(() => getInProgressMeta(kind, id));
  const checked = getInProgress()[kind][id]?.length ?? 0;

  // Receitas iniciadas antes desta versão não têm dados salvos: busca na API (ou cache).
  useEffect(() => {
    if (meta) return undefined;
    let cancelled = false;
    (async () => {
      const raw = await (kind === 'meals' ? getMealById(id) : getDrinkById(id));
      const recipe = raw ? ProductDetailsConverter(raw) : null;
      if (cancelled || !recipe) return;
      const next = {
        name: recipe.str,
        image: recipe.img,
        category: recipe.strCategory || '',
        total: getIngredientsAndMeasures(recipe).ingredients.length,
      };
      startRecipe(kind, id, next);
      setMeta(next);
    })();
    return () => { cancelled = true; };
  }, [kind, id, meta]);

  const total = meta?.total ?? 0;
  const percent = total ? Math.min(100, (checked / total) * 100) : 0;

  return (
    <Flex
      as="article"
      data-testid={ `${index}-in-progress-card` }
      direction="column"
      bg="white"
      borderRadius="2xl"
      boxShadow="card"
      overflow="hidden"
    >
      <AspectRatio ratio={ 16 / 9 }>
        <RecipeImage
          src={ meta?.image }
          alt={ meta?.name ?? '' }
          kind={ kind === 'meals' ? 'meal' : 'drink' }
        />
      </AspectRatio>
      <Flex direction="column" gap={ 3 } p={ 4 } flex={ 1 }>
        <Flex gap={ 2 } align="center">
          <TypeBadge type={ kind === 'meals' ? 'meal' : 'drink' } />
          {meta?.category && <Text fontSize="sm" color="ink.400">{category(meta.category)}</Text>}
        </Flex>
        <Heading as="h3" size="md" fontFamily="body" noOfLines={ 2 } minH="2.6em">
          {meta?.name ?? t('loading')}
        </Heading>
        <Box>
          <Progress
            value={ percent }
            size="sm"
            borderRadius="full"
            colorScheme={ kind === 'meals' ? 'brand' : 'grape' }
            aria-label={ t('progressOf', { done: checked, total }) }
          />
          <Text mt={ 1 } fontSize="sm" color="ink.400">
            {t('progressOf', { done: checked, total })}
          </Text>
        </Box>
        <Flex gap={ 2 } mt="auto">
          <Button
            as={ RouterLink }
            to={ `/${kind}/${id}/in-progress` }
            data-testid={ `${index}-continue-btn` }
            flex={ 1 }
            colorScheme={ kind === 'meals' ? 'brand' : 'grape' }
            rightIcon={ <FiArrowRight /> }
          >
            {t('continueRecipe')}
          </Button>
          <IconButton
            variant="outline"
            aria-label={ t('discardRecipe') }
            data-testid={ `${index}-discard-btn` }
            icon={ <FiTrash2 /> }
            onClick={ onDiscard }
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function InProgressRecipes() {
  const { t } = useI18n();
  const toast = useToast();
  const [entries, setEntries] = useState<Entry[]>(listEntries);

  const discard = (entry: Entry) => {
    removeInProgress(entry.kind, entry.id);
    setEntries(listEntries());
    toast({ title: t('recipeDiscarded'), status: 'info', duration: 2000, position: 'top' });
  };

  return (
    <Page title={ t('titleInProgress') } subtitle={ t('inProgressSubtitle') } icon={ FiClock } iconColor="basil">
      {entries.length === 0 ? (
        <EmptyState
          testId="empty-in-progress"
          icon={ FiClock }
          title={ t('inProgressEmptyTitle') }
          text={ t('inProgressEmptyText') }
        >
          <Button as={ RouterLink } to="/meals">{t('goToMeals')}</Button>
        </EmptyState>
      ) : (
        <SimpleGrid columns={ { base: 1, sm: 2, lg: 3 } } spacing={ 5 }>
          {entries.map((entry, index) => (
            <InProgressCard
              key={ `${entry.kind}-${entry.id}` }
              entry={ entry }
              index={ index }
              onDiscard={ () => discard(entry) }
            />
          ))}
        </SimpleGrid>
      )}
    </Page>
  );
}
