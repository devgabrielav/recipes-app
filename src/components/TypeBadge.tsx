import { Badge } from '@chakra-ui/react';
import { useI18n } from '../i18n/I18nProvider';

export default function TypeBadge({ type }: { type: string }) {
  const { t } = useI18n();
  const isMeal = type === 'meal';
  return (
    <Badge
      colorScheme={ isMeal ? 'brand' : 'grape' }
      borderRadius="full"
      px={ 2.5 }
      py={ 0.5 }
      textTransform="none"
      fontSize="xs"
    >
      {isMeal ? t('typeMeal') : t('typeDrink')}
    </Badge>
  );
}
