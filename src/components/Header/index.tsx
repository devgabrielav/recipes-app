import { Link } from 'react-router-dom';
import { FormEvent, useContext, useState, ChangeEvent } from 'react';
import { Input, Box,
  Heading, RadioGroup, Radio, Container, Button, Flex, Center } from '@chakra-ui/react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import recipesAppIcon from '../../images/recipesAppIcon.svg';
import recipesAppTitle from '../../images/recipesAppTitle.svg';
import { layoutContext } from '../../context/layout/layoutContext';

type HeaderPropsType = {
  title: string | undefined
  disableSearch?: boolean
};

export default function Header({ title, disableSearch = false }: HeaderPropsType) {
  const [radioGroup, setRadioGroup] = useState('ingredient');
  const [search, setSearch] = useState({
    isVisible: false,
    searchValue: '',
  });
  const toggleSearch = () => setSearch((prev) => ({
    ...prev, isVisible: !prev.isVisible,
  }));
  const setLayout = useContext(layoutContext)[1];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLayout((prev) => ({
      ...prev,
      searchType: radioGroup,
      searchValue: search.searchValue,
    }));
  };

  if (title) {
    return (
      <header>
        <Flex bg="#FCDC36" paddingInline={ 4 } justifyContent="space-between">

          <Flex>
            <img
              src={ recipesAppIcon }
              alt="Recipes app Icon"
            />
            <img src={ recipesAppTitle } alt="Recipes app Title" />
          </Flex>

          <Flex gap={ 4 }>
            {!disableSearch
            && (
              <Box
                as="button"
                onClick={ toggleSearch }
              >
                <img src={ searchIcon } alt="Search Icon" data-testid="search-top-btn" />
              </Box>
            )}

            <Link to="/profile">
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="Profile Icon"
              />
            </Link>
          </Flex>
        </Flex>
        <Center>
          <Heading
            data-testid="page-title"
            color="#41197F"
          >
            {title}
          </Heading>
        </Center>

        {search.isVisible && (
          <Container
            bg="#41197F"
            color="white"
            width={ 338 }
            height={ 148 }
            padding={ 0 }
            borderRadius={ 6 }
          >
            <form
              onSubmit={ handleSubmit }
            >
              <Input
                data-testid="search-input"
                placeholder="Search"
                type="text"
                bg="white"
                width={ 338 }
                marginBottom={ 4 }
                name="searchValue"
                color="black"
                onChange={ handleChange }
              />

              <Flex
                justify="center"
                align="center"
                direction="column"
              >
                <RadioGroup
                  gap={ 2 }
                  onChange={ setRadioGroup }
                  value={ radioGroup }
                  name="search-type"
                >
                  <Radio
                    colorScheme="yellow"
                    value="ingredient"
                    data-testid="ingredient-search-radio"
                    marginEnd={ 4 }
                  >
                    Ingredient
                  </Radio>
                  <Radio
                    colorScheme="yellow"
                    value="name"
                    marginEnd={ 4 }
                    data-testid="name-search-radio"
                  >
                    Name
                  </Radio>
                  <Radio
                    data-testid="first-letter-search-radio"
                    colorScheme="yellow"
                    value="firstLetter"
                  >
                    First letter
                  </Radio>
                </RadioGroup>
                <Button
                  m={ 4 }
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
        )}
      </header>
    );
  }
}
