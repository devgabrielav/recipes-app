import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { FiCompass } from 'react-icons/fi';
import Page from '../components/Layout/Page';
import EmptyState from '../components/EmptyState';
import { useI18n } from '../i18n/I18nProvider';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <Page>
      <EmptyState
        testId="not-found"
        icon={ FiCompass }
        title={ t('notFoundTitle') }
        text={ t('notFoundText') }
      >
        <Button as={ RouterLink } to="/">{t('goHome')}</Button>
      </EmptyState>
    </Page>
  );
}
