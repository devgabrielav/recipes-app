import { Button, ButtonGroup } from '@chakra-ui/react';
import { useI18n } from '../../i18n/I18nProvider';

export type TypeFilter = 'all' | 'meal' | 'drink';

/** Filtro Todas / Comidas / Bebidas (Favoritas e Feitas). */
export default function FilterButtons({ value, onChange }: {
  value: TypeFilter;
  onChange: (value: TypeFilter) => void;
}) {
  const { t } = useI18n();
  const options: { id: TypeFilter; label: string; testId: string }[] = [
    { id: 'all', label: t('all'), testId: 'filter-by-all-btn' },
    { id: 'meal', label: t('navMeals'), testId: 'filter-by-meal-btn' },
    { id: 'drink', label: t('navDrinks'), testId: 'filter-by-drink-btn' },
  ];
  return (
    <ButtonGroup isAttached mb={ 5 } role="group" size="sm">
      {options.map((option) => (
        <Button
          key={ option.id }
          data-testid={ option.testId }
          aria-pressed={ value === option.id }
          variant={ value === option.id ? 'solid' : 'outline' }
          bg={ value === option.id ? undefined : 'white' }
          onClick={ () => onChange(option.id) }
          px={ 5 }
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
