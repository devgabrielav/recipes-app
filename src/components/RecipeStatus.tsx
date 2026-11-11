import { Box, Button, Skeleton, VisuallyHidden } from '@chakra-ui/react';
import { FiAlertCircle, FiWifiOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import EmptyState from './EmptyState';
import { DetailsStatus } from '../hooks/useRecipesDetails';
import { retryApi } from '../helper/apiStatus';
import { useI18n } from '../i18n/I18nProvider';

/** Estados de carregamento / erro das páginas de receita. */
export default function RecipeStatus({ status }: { status: DetailsStatus }) {
  const { t } = useI18n();
  const navigate = useNavigate();

  if (status === 'not-found') {
    return (
      <EmptyState
        testId="recipe-not-found"
        icon={ FiAlertCircle }
        title={ t('recipeNotFoundTitle') }
        text={ t('recipeNotFoundText') }
      >
        <Button onClick={ () => navigate('/meals') }>{t('goToMeals')}</Button>
      </EmptyState>
    );
  }
  if (status === 'unavailable') {
    return (
      <EmptyState
        testId="recipe-unavailable"
        icon={ FiWifiOff }
        title={ t('recipeUnavailableTitle') }
        text={ t('recipeUnavailableText') }
      >
        <Button onClick={ retryApi }>{t('retry')}</Button>
      </EmptyState>
    );
  }
  return (
    <Box aria-busy="true">
      <VisuallyHidden>{t('loading')}</VisuallyHidden>
      <Skeleton h={ { base: '220px', md: '300px' } } borderRadius="2xl" mb={ 5 } />
      <Skeleton h="32px" w="60%" mb={ 3 } />
      <Skeleton h="180px" borderRadius="2xl" />
    </Box>
  );
}
