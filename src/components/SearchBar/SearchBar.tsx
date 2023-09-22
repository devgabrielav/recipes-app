import React, { FormEvent, useState } from 'react';
import { Input, Radio, Button, Flex, RadioGroup, Box } from '@chakra-ui/react';
import useExecuteSearch from '../../hooks/useExecuteSearch';

export default function SearchBar() {
  const [searchOption, setSearchOption] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const executeSearch = useExecuteSearch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeSearch(searchOption, searchInput);
  };

  return (
    <Box
      bg="#41197F"
      color="white"
      height={ 148 }
      padding={ 0 }
      borderRadius={ 6 }
      marginBottom={ 4 }
    >
      <form
        onSubmit={ handleSubmit }
      >
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
    </Box>
  );
}
