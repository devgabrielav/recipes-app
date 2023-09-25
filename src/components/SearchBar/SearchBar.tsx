import React, { FormEvent, useState, useContext } from 'react';
import {
  Input, Radio, Button, Flex, Container, RadioGroup,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMealsAPI, searchCocktailsAPI } from '../../helper/helpersAPI';
import { RecipeType } from '../../utils/types';
import { layoutContext } from '../../context/layout/layoutContext';

export default function SearchBar() {
  const [searchOption, setSearchOption] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const [layout, setLayout] = useContext(layoutContext);
  // const [searchResults, setSearchResults] = useState<SearchResultsType>({
  //   meals: [],
  //   drinks: [],
  // });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { meals, drinks } = layout.searchResults;
  const updateSearchResults = (newValue: RecipeType[], key: 'meals' | 'drinks') => {
    setLayout((prev) => (
      { ...prev, searchResults: { ...prev.searchResults, [key]: newValue } }));
  };
  const executeSearch = async (event: FormEvent) => {
    event.preventDefault();
    let data;
    if (searchOption === 'first-letter' && searchInput.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }
    if (pathname === '/meals') {
      data = await searchMealsAPI(searchOption, searchInput);
      updateSearchResults(data.meals || [], 'meals');
      if (data.meals.length === 1) {
        return navigate(`/meals/${data.meals[0].idMeal}`);
      }
      if (data.meals.length === 0) {
        window.alert("Sorry, we haven't found any recipes for these filters.");
      }
    } else if (pathname === '/drinks') {
      data = await searchCocktailsAPI(searchOption, searchInput);
      updateSearchResults(data.drinks || [], 'drinks');
      if (data.drinks.length === 1) {
        navigate(`/drinks/${data.drinks[0].idDrink}`);
      }
      if (data.drinks.length === 0) {
        window.alert("Sorry, we haven't found any recipes for these filters.");
      }
    }
  };

  return (
    <Container
      maxW="360px"
      padding={ 0 }
      bg="#41197F"
      color="white"
      height={ 148 }
      borderRadius={ 6 }
      marginBottom={ 4 }
    >
      <form onSubmit={ executeSearch }>
        <Input
          data-testid="search-input"
          placeholder="Search"
          type="text"
          bg="white"
          marginBottom={ 4 }
          name="searchValue"
          color="black"
          onChange={ (e) => setSearchInput(e.target.value) }
        />
        <Flex
          justify="center"
          align="center"
          direction="column"
          justifyContent="space-between"
        >
          <RadioGroup
            onChange={ setSearchOption }
            value={ searchOption }
            name="search-type"
            colorScheme="yellow"
            display="flex"
            justifyContent="space-between"
            gap={ 5 }
          >
            <Radio
              value="ingredient"
              data-testid="ingredient-search-radio"
            >
              Ingredient
            </Radio>
            <Radio
              value="name"
              data-testid="name-search-radio"
            >
              Name
            </Radio>
            <Radio
              value="first-letter"
              data-testid="first-letter-search-radio"
            >
              First letter
            </Radio>
          </RadioGroup>

          <Button
            mt={ 4 }
            colorScheme="yellow"
            w={ 300 }
            color="white"
            data-testid="exec-search-btn"
            type="submit"
          >
            SEARCH
          </Button>
        </Flex>
      </form>
    </Container>
  );
}
