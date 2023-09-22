import { useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useState, ChangeEvent } from 'react';
import { Box, Heading, Flex, Center } from '@chakra-ui/react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import recipesAppIcon from '../../images/recipesAppIcon.svg';
import recipesAppTitle from '../../images/recipesAppTitle.svg';
import { layoutContext } from '../../context/layout/layoutContext';
import SearchBar from '../SearchBar/SearchBar';

type HeaderPropsType = {
  title: string | undefined
  disableSearch?: boolean
};

export default function Header({ title, disableSearch = false }: HeaderPropsType) {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    isVisible: false,
  });
  const toggleSearch = () => setSearch((prev) => ({
    ...prev, isVisible: !prev.isVisible,
  }));
  // const setLayout = useContext(layoutContext)[1];

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setSearch((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault();
  //   setLayout((prev) => ({
  //     ...prev,
  //     searchType: radioGroup,
  //     searchValue: search.searchValue,
  //   }));
  // };

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

            <Box
              as="button"
              onClick={ () => navigate('/profile') }
            >
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="Profile Icon"
              />
            </Box>
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
          <SearchBar />
        )}
      </header>
    );
  }
}
