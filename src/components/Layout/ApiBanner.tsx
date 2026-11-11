import { Alert, AlertDescription, AlertIcon, Box, Button } from '@chakra-ui/react';
import { FiRefreshCw, FiWifiOff } from 'react-icons/fi';
import { retryApi, useApiStatus } from '../../helper/apiStatus';
import { useI18n } from '../../i18n/I18nProvider';

/** Aviso exibido quando a API caiu e o app está usando cache ou dados de exemplo. */
export default function ApiBanner() {
  const { mode, lastFailed } = useApiStatus();
  const { t } = useI18n();
  if (mode === 'online') return null;

  const message = mode === 'sample' ? t('apiSampleBanner') : t('apiCacheBanner');

  return (
    <Box maxW="1200px" mx="auto" px={ { base: 3, md: 6 } } pt={ 4 }>
      <Alert
        status="info"
        borderRadius="xl"
        data-testid="api-banner"
        alignItems={ { base: 'flex-start', sm: 'center' } }
        flexDirection={ { base: 'column', sm: 'row' } }
        gap={ 2 }
      >
        <AlertIcon as={ FiWifiOff } />
        <AlertDescription flex={ 1 } fontSize="sm">
          {message}
        </AlertDescription>
        <Button
          size="sm"
          variant="outline"
          leftIcon={ <FiRefreshCw /> }
          onClick={ retryApi }
          isDisabled={ !lastFailed }
          data-testid="api-retry-btn"
        >
          {lastFailed ? t('retry') : t('apiRetrying')}
        </Button>
      </Alert>
    </Box>
  );
}
