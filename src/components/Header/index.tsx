import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Input, Box,
  Heading, RadioGroup, Radio, Container, Button, Flex, Center } from '@chakra-ui/react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import recipesAppIcon from '../../images/recipesAppIcon.svg';
import recipesAppTitle from '../../images/recipesAppTitle.svg';

type HeaderPropsType = {
  title: string | undefined
};

export default function Header({ title }: HeaderPropsType) {
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [radioGroup, setRadioGroup] = useState('ingredient');
  const toggleSearch = () => setSearch(!search);

  if (title) {
    return (
      <header>
        <Flex bg="#FCDC36" paddingInline={ 4 } justifyContent="space-between">

          <Flex>
            <img src={ recipesAppIcon } alt="Recipes app Icon" />
            <img src={ recipesAppTitle } alt="Recipes app Title" />
          </Flex>

          <Flex gap={ 4 }>
            <Box
              as="button"
              data-testid="search-top-btn"
              onClick={ toggleSearch }
            >
              <img src={ searchIcon } alt="Search Icon" />
            </Box>

            <Box
              as="button"
              onClick={ () => navigate('/profile') }
              data-testid="profile-top-btn"
            >
              <img src={ profileIcon } alt="Profile Icon" />
            </Box>
          </Flex>
        </Flex>
        <Center>
          <Heading
            data-testid="page-title"
            color="#41197F"
          >
            {title.toLocaleUpperCase()}
          </Heading>
        </Center>

        {search && (
          <Container
            bg="#41197F"
            color="white"
            width={ 338 }
            height={ 148 }
            padding={ 0 }
            borderRadius={ 6 }
          >
            <Input
              data-testid="search-input"
              placeholder="Search"
              type="text"
              bg="white"
              width={ 338 }
              marginBottom={ 4 }
              name="search"
            />
            <form onSubmit={ (e) => e.preventDefault() }>

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
                    value="firtLetter"
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
