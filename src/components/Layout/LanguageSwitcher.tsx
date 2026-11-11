import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
import { FiGlobe } from 'react-icons/fi';
import { useI18n } from '../../i18n/I18nProvider';
import { LANGS } from '../../i18n/translations';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <ButtonGroup
      isAttached
      size="xs"
      variant="outline"
      role="group"
      aria-label={ t('language') }
      alignItems="center"
      bg="white"
      borderRadius="full"
      borderWidth="1px"
      borderColor="cream.300"
      pl={ 2 }
    >
      <Icon as={ FiGlobe } color="ink.300" aria-hidden mr={ 1 } />
      {LANGS.map((code) => (
        <Button
          key={ code }
          data-testid={ `lang-${code}` }
          aria-pressed={ lang === code }
          onClick={ () => setLang(code) }
          variant={ lang === code ? 'solid' : 'ghost' }
          borderRadius="full"
          minW={ 9 }
          textTransform="uppercase"
        >
          {code}
        </Button>
      ))}
    </ButtonGroup>
  );
}
