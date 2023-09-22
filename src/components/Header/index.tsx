import { Link, useLocation } from 'react-router-dom';
import { Box, Link as ChakraLink,
  Heading, Flex, Center } from '@chakra-ui/react';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import recipesAppIcon from '../../images/recipesAppIcon.svg';
import recipesAppTitle from '../../images/recipesAppTitle.svg';
import SearchBar from '../SearchBar/SearchBar';

export default function Header() {
  const [search, setSearch] = useState({
    isVisible: false,
  });
  const toggleSearch = () => setSearch((prev) => ({
    ...prev, isVisible: !prev.isVisible,
  }));
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname.replace('/', '');
    const array = path.split('-');
    const upLetter = array.map((word) => word[0].toUpperCase() + word.slice(1));
    const title = upLetter.join(' ');
    return title;
  };
  const title = getTitle();

  const disableSearch = () => {
    return location.pathname === '/favorite-recipes'
      || location.pathname === '/done-recipes' || location.pathname === '/profile';
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

          <Center gap={ 4 }>
            {!disableSearch()
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
