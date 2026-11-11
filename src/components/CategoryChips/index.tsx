import { Button, Flex } from '@chakra-ui/react';
import { useI18n } from '../../i18n/I18nProvider';

type Props = {
  categories: { strCategory: string }[];
  active: string;
  colorScheme: string;
  onSelect: (category: string) => void;
};

/** Filtros por categoria: uma faixa rolável horizontalmente (ótima no celular). */
export default function CategoryChips({ categories, active, colorScheme, onSelect }: Props) {
  const { t, category } = useI18n();
  const chip = (key: string, label: string, value: string, testId: string) => {
    const selected = active === value;
    return (
      <Button
        key={ key }
        size="sm"
        flexShrink={ 0 }
        borderRadius="full"
        colorScheme={ colorScheme }
        variant={ selected ? 'solid' : 'outline' }
        bg={ selected ? undefined : 'white' }
        aria-pressed={ selected }
        data-testid={ testId }
        onClick={ () => onSelect(value) }
      >
        {label}
      </Button>
    );
  };

  return (
    <Flex
      gap={ 2 }
      overflowX="auto"
      py={ 1 }
      mx={ { base: -4, md: 0 } }
      px={ { base: 4, md: 0 } }
      role="group"
      sx={ { scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } } }
    >
      {chip('all', t('all'), '', 'All-category-filter')}
      {categories.map((c) => chip(
        c.strCategory,
        category(c.strCategory),
        c.strCategory,
        `${c.strCategory}-category-filter`,
      ))}
    </Flex>
  );
}
