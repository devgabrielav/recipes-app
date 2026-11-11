import { FormEvent, useContext, useState } from 'react';
import {
  Box, Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchCocktailsAPI, searchMealsAPI, kindFromPath } from '../../helper/helpersAPI';
import { useApiStatus } from '../../helper/apiStatus';
import { layoutContext } from '../../context/layout/layoutContext';
import { useI18n } from '../../i18n/I18nProvider';
import { RecipeKind } from '../../utils/types';

export default function SearchBar({ onDone }: { onDone?: () => void }) {
  const [searchOption, setSearchOption] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [, setLayout] = useContext(layoutContext);
  const { version } = useApiStatus();
  const { t } = useI18n();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const kind: RecipeKind = kindFromPath(pathname);

  const executeSearch = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (searchOption === 'first-letter' && searchInput.length !== 1) {
      setError(t('firstLetterError'));
      return;
    }
    setSearching(true);
    const results = await (kind === 'meals'
      ? searchMealsAPI(searchOption, searchInput)
      : searchCocktailsAPI(searchOption, searchInput));
    setSearching(false);

    setLayout((prev) => ({
      ...prev,
      searchResults: { ...prev.searchResults, [kind]: results },
      loadedAt: { ...prev.loadedAt, [kind]: version },
      category: { ...prev.category, [kind]: '' },
    }));

    if (results.length === 1) {
      navigate(`/${kind}/${results[0].idMeal || results[0].idDrink}`);
      return;
    }
    onDone?.();
  };

  return (
    <Box
      as="form"
      onSubmit={ executeSearch }
      role="search"
      bg="white"
      borderRadius="2xl"
      boxShadow="card"
      p={ { base: 3, md: 4 } }
    >
      <Flex direction={ { base: 'column', md: 'row' } } gap={ 3 } align={ { md: 'center' } }>
        <FormControl isInvalid={ Boolean(error) } flex={ 1 }>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="ink.300">
              <FiSearch />
            </InputLeftElement>
            <Input
              data-testid="search-input"
              placeholder={ t('searchPlaceholder') }
              aria-label={ t('searchPlaceholder') }
              type="text"
              name="searchValue"
              value={ searchInput }
              onChange={ (e) => setSearchInput(e.target.value) }
              bg="cream.50"
            />
          </InputGroup>
          <FormErrorMessage data-testid="search-error">{error}</FormErrorMessage>
        </FormControl>

        <RadioGroup
          onChange={ setSearchOption }
          value={ searchOption }
          name="search-type"
          colorScheme="brand"
        >
          <Flex gap={ 4 } wrap="wrap">
            <Radio value="ingredient" data-testid="ingredient-search-radio">
              {t('byIngredient')}
            </Radio>
            <Radio value="name" data-testid="name-search-radio">{t('byName')}</Radio>
            <Radio value="first-letter" data-testid="first-letter-search-radio">
              {t('byFirstLetter')}
            </Radio>
          </Flex>
        </RadioGroup>

        <Button
          type="submit"
          data-testid="exec-search-btn"
          isLoading={ searching }
          loadingText={ t('searching') }
          px={ 8 }
        >
          {t('searchButton')}
        </Button>
      </Flex>
    </Box>
  );
}
