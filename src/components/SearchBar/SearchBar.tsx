import React, { FormEvent, useState } from 'react';
import { Input, Radio, Button, Flex, Container, RadioGroup,
  SimpleGrid, Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { searchMealsAPI, searchCocktailsAPI } from '../../helper/helpersAPI';
import RecipeCard from '../RecipeCard';

export default function SearchBar() {
  const [searchOption, setSearchOption] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { pathname } = useLocation();
  const executeSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (searchOption === 'first-letter' && searchInput.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }
    if (pathname === '/meals') {
      const data = await searchMealsAPI(searchOption, searchInput);
      setSearchResults(data.meals || []);
    } else if (pathname === '/drinks') {
      const data = await searchCocktailsAPI(searchOption, searchInput);
      setSearchResults(data.drinks || []);
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

      <SimpleGrid columns={ 2 } spacing={ 10 }>
        {searchResults.map((obj) => (
          <RecipeCard
            key={ obj.idMeal || obj.idDrink }
            recipe={ obj }
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
