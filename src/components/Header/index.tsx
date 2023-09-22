import { Link } from 'react-router-dom';
import { Box, Link as ChakraLink,
  Heading, Flex, Center } from '@chakra-ui/react';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import recipesAppIcon from '../../images/recipesAppIcon.svg';
import recipesAppTitle from '../../images/recipesAppTitle.svg';
import SearchBar from '../SearchBar/SearchBar';

type HeaderPropsType = {
  title: string | undefined
  disableSearch?: boolean
};

export default function Header({ title, disableSearch = false }: HeaderPropsType) {
  const [search, setSearch] = useState({
    isVisible: false,
  });
  const toggleSearch = () => setSearch((prev) => ({
    ...prev, isVisible: !prev.isVisible,
  }));

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

          <Center gap={ 4 }>
            {!disableSearch
            && (
              <Box
                as="button"
                onClick={ toggleSearch }
              >
                <img src={ searchIcon } alt="Search Icon" data-testid="search-top-btn" />
              </Box>
            )}
            <ChakraLink as={ Link } to="/profile">
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="Profile Icon"
              />
            </ChakraLink>
          </Center>
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
          <SearchBar />)}
      </header>
    );
  }
}
