import { useState } from 'react';
import { Button, HStack, Icon, IconButton, SimpleGrid } from '@chakra-ui/react';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import Page from '../components/Layout/Page';
import EmptyState from '../components/EmptyState';
import RecipeSavedCard from '../components/RecipeSavedCard';
import FilterButtons, { TypeFilter } from '../components/FilterButtons';
import useShare from '../hooks/useShare';
import { getFavorites, saveToFavorites } from '../helper/storage';
import { useI18n } from '../i18n/I18nProvider';
import { FavoriteRecipeType } from '../utils/types';

export default function FavoriteRecipes() {
  const { t } = useI18n();
  const share = useShare();
  const [favorites, setFavorites] = useState<FavoriteRecipeType[]>(getFavorites);
  const [filter, setFilter] = useState<TypeFilter>('all');

  const visible = favorites.filter((r) => filter === 'all' || r.type === filter);
  const remove = (recipe: FavoriteRecipeType) => {
    saveToFavorites(recipe);
    setFavorites(getFavorites());
  };

  return (
    <Page title={ t('titleFavorites') } icon={ FiHeart }>
      <FilterButtons value={ filter } onChange={ setFilter } />
      {visible.length === 0 ? (
        <EmptyState
          testId="empty-favorites"
          icon={ FiHeart }
          title={ t('favoritesEmptyTitle') }
          text={ t('favoritesEmptyText') }
        />
      ) : (
        <SimpleGrid columns={ { base: 1, lg: 2 } } spacing={ 4 }>
          {visible.map((recipe, index) => (
            <RecipeSavedCard
              key={ `${recipe.type}-${recipe.id}` }
              recipe={ recipe }
              index={ index }
              actions={ (
                <HStack>
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={ <Icon as={ FiHeart } fill="currentColor" /> }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => remove(recipe) }
                  >
                    {t('removeFavorite')}
                  </Button>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label={ t('share') }
                    data-testid={ `${index}-horizontal-share-btn` }
                    icon={ <FiShare2 /> }
                    onClick={ () => share(`/${recipe.type === 'meal' ? 'meals' : 'drinks'}/${recipe.id}`) }
                  />
                </HStack>
              ) }
            />
          ))}
        </SimpleGrid>
      )}
    </Page>
  );
}
