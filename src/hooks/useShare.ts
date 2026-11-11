import { useToast } from '@chakra-ui/react';
import { useI18n } from '../i18n/I18nProvider';

/** Copia o link de uma receita (rota interna) para a área de transferência. */
export default function useShare() {
  const toast = useToast();
  const { t } = useI18n();

  return async (path: string) => {
    const base = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}`;
    try {
      await navigator.clipboard.writeText(`${base}${path}`);
      toast({ title: t('linkCopied'), status: 'success', duration: 2000, position: 'top' });
    } catch {
      toast({ title: t('copyFailed'), status: 'error', duration: 3000, position: 'top' });
    }
  };
}
