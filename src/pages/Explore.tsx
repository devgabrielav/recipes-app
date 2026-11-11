import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Skeleton, SimpleGrid, Text } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { MdLocalBar, MdRestaurant } from 'react-icons/md';
import Page from '../components/Layout/Page';
import RecipeCard from '../components/RecipeCard';
import CategoryChips from '../components/CategoryChips';
import EmptyState from '../components/EmptyState';
import { layoutContext } from '../context/layout/layoutContext';
import {
  fetchAllRecipes, fetchByCategory, fetchCategories, kindFromPath,
} from '../helper/helpersAPI';
import { useApiStatus } from '../helper/apiStatus';
import { useI18n } from '../i18n/I18nProvider';
import { RecipeKind, RecipeType } from '../utils/types';

export default function Explore() {
  const { pathname } = useLocation();
  const kind: RecipeKind = kindFromPath(pathname);
  const [layout, setLayout] = useContext(layoutContext);
  const { version } = useApiStatus();
  const { t, plural } = useI18n();
  const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const results = layout.searchResults[kind];
  const activeCategory = layout.category[kind];
  const isMeals = kind === 'meals';
  const accent = isMeals ? 'brand' : 'grape';

  const store = (list: RecipeType[], category: string) => setLayout((prev) => ({
    ...prev,
    searchResults: { ...prev.searchResults, [kind]: list },
    loadedAt: { ...prev.loadedAt, [kind]: version },
    category: { ...prev.category, [kind]: category },
  }));

  useEffect(() => {
    let cancelled = false;
    fetchCategories(kind).then((list) => { if (!cancelled) setCategories(list); });
    return () => { cancelled = true; };
  }, [kind, version]);

  useEffect(() => {
    // Mantém busca/filtro ao voltar de uma receita; só recarrega após "Tentar novamente".
    if (layout.loadedAt[kind] === version) return undefined;
    let cancelled = false;
    setLoading(true);
    fetchAllRecipes(kind).then((list) => {
      if (cancelled) return;
      store(list, '');
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [kind, version]);

  const selectCategory = async (value: string) => {
    const next = value === activeCategory ? '' : value;
    setLayout((prev) => ({ ...prev, category: { ...prev.category, [kind]: next } }));
    setLoading(true);
    const list = next ? await fetchByCategory(kind, next) : await fetchAllRecipes(kind);
    store(list, next);
    setLoading(false);
  };

  const selectAllRecipes = async () => {
    setLoading(true);
    store(await fetchAllRecipes(kind), '');
    setLoading(false);
  };

  return (
    <Page
      key={ kind }
      title={ isMeals ? t('titleMeals') : t('titleDrinks') }
      subtitle={ isMeals ? t('subtitleMeals') : t('subtitleDrinks') }
      icon={ isMeals ? MdRestaurant : MdLocalBar }
      iconColor={ accent }
      aside={ !loading && results.length > 0 ? (
        <Text
          display={ { base: 'none', sm: 'block' } }
          color="ink.400"
          fontWeight={ 500 }
          data-testid="results-count"
        >
          {plural('results', results.length)}
        </Text>
      ) : undefined }
    >
      <Box mb={ 5 }>
        <CategoryChips
          categories={ categories }
          active={ activeCategory }
          colorScheme={ accent }
          onSelect={ selectCategory }
        />
      </Box>

      {loading && results.length === 0 ? (
        <SimpleGrid columns={ { base: 2, sm: 3, lg: 4 } } spacing={ { base: 3, md: 5 } }>
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={ i } borderRadius="2xl" h={ { base: '190px', md: '250px' } } />
          ))}
        </SimpleGrid>
      ) : results.length === 0 ? (
        <EmptyState
          testId="empty-results"
          icon={ FiSearch }
          title={ t('noResultsTitle') }
          text={ t('noResultsText') }
        >
          <Button onClick={ selectAllRecipes } colorScheme={ accent }>{t('clearFilters')}</Button>
        </EmptyState>
      ) : (
        <SimpleGrid
          columns={ { base: 2, sm: 3, lg: 4 } }
          spacing={ { base: 3, md: 5 } }
          opacity={ loading ? 0.55 : 1 }
          transition="opacity .2s"
          aria-busy={ loading }
        >
          {results.slice(0, 12).map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal || recipe.idDrink }
              index={ index }
              recipe={ recipe }
            />
          ))}
        </SimpleGrid>
      )}
    </Page>
  );
}
