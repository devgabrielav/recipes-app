import { useMemo, useState } from 'react';
import { Badge, Flex, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import { FiCheckCircle, FiShare2 } from 'react-icons/fi';
import Page from '../components/Layout/Page';
import EmptyState from '../components/EmptyState';
import RecipeSavedCard from '../components/RecipeSavedCard';
import FilterButtons, { TypeFilter } from '../components/FilterButtons';
import useShare from '../hooks/useShare';
import { getDoneRecipes } from '../helper/storage';
import { useI18n } from '../i18n/I18nProvider';

export default function DoneRecipes() {
  const { t, formatDate } = useI18n();
  const share = useShare();
  const [filter, setFilter] = useState<TypeFilter>('all');
  // Mais recentes primeiro.
  const recipes = useMemo(() => [...getDoneRecipes()].reverse(), []);
  const visible = recipes.filter((r) => filter === 'all' || r.type === filter);

  return (
    <Page title={ t('titleDone') } icon={ FiCheckCircle } iconColor="basil">
      <FilterButtons value={ filter } onChange={ setFilter } />
      {visible.length === 0 ? (
        <EmptyState
          testId="empty-done"
          icon={ FiCheckCircle }
          title={ t('doneEmptyTitle') }
          text={ t('doneEmptyText') }
        />
      ) : (
        <SimpleGrid columns={ { base: 1, lg: 2 } } spacing={ 4 }>
          {visible.map((recipe, index) => (
            <RecipeSavedCard
              key={ `${recipe.type}-${recipe.id}-${recipe.doneDate}` }
              recipe={ recipe }
              index={ index }
              extra={ (
                <>
                  <Text
                    data-testid={ `${index}-horizontal-done-date` }
                    fontSize="sm"
                    color="ink.400"
                  >
                    {t('doneOn', { date: formatDate(recipe.doneDate) })}
                  </Text>
                  <Flex wrap="wrap" gap={ 1 }>
                    {(recipe.tags ?? []).slice(0, 2).map((tag) => (
                      <Badge
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        colorScheme="basil"
                        borderRadius="full"
                        px={ 2 }
                        textTransform="none"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                </>
              ) }
              actions={ (
                <IconButton
                  size="sm"
                  variant="outline"
                  aria-label={ t('share') }
                  data-testid={ `${index}-horizontal-share-btn` }
                  icon={ <FiShare2 /> }
                  onClick={ () => share(`/${recipe.type === 'meal' ? 'meals' : 'drinks'}/${recipe.id}`) }
                />
              ) }
            />
          ))}
        </SimpleGrid>
      )}
    </Page>
  );
}
