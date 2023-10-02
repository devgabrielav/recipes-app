import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  Badge,
  Flex,
} from '@chakra-ui/react';
import Header from '../Header';
import { RecipeType } from '../../utils/types';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<RecipeType[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  useEffect(() => {
    const doneRecipesDataJSON = localStorage.getItem('doneRecipes');
    const doneRecipesData = doneRecipesDataJSON ? JSON.parse(doneRecipesDataJSON) : [];
    setDoneRecipes(doneRecipesData);
    setDataLoaded(true);
  }, []);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Box p={ 4 }>
        <Flex mb={ 4 }>
          <Button data-testid="filter-by-all-btn" mr={ 2 }>
            All
          </Button>
          <Button data-testid="filter-by-meal-btn" mr={ 2 }>
            Meals
          </Button>
          <Button data-testid="filter-by-drink-btn">
            Drinks
          </Button>
        </Flex>

        {doneRecipes.map((recipe, index) => (
          <Box
            key={ index }
            borderWidth="1px"
            borderRadius="lg"
            p={ 4 }
            mb={ 4 }
            display="flex"
            flexDirection="column"
          >
            <Image
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              maxW="200px"
              mb={ 2 }
            />
            <Text>
              {recipe.type === 'meal' ? (
                <Badge
                  data-testid={ `${index}-horizontal-top-text` }
                  colorScheme="gray"
                >
                  {recipe.nationality}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </Badge>
              ) : (
                <Badge
                  data-testid={ `${index}-horizontal-top-text` }
                  colorScheme="gray"
                >
                  {recipe.alcoholicOrNot}
                </Badge>
              )}
            </Text>
            <Text
              data-testid={ `${index}-horizontal-name` }
              fontWeight="bold"
              fontSize="lg"
              mt={ 2 }
            >
              {recipe.name}
            </Text>
            <Text data-testid={ `${index}-horizontal-done-date` } mt={ 2 }>
              Done Date:
              {' '}
              {recipe.doneDate}
            </Text>
            <Button
              data-testid={ `${index}-horizontal-share-btn` }
              mt={ 2 }
              as="button"
            >
              <Image src={ shareIcon } alt="Share" w={ 4 } h={ 4 } mr={ 2 } />
              Share
            </Button>
            <Flex flexWrap="wrap" mt={ 2 }>
              {recipe.tags && recipe.tags.slice(0, 2)
                .map((tag: any, tagIndex: any) => (
                  <Badge
                    key={ tagIndex }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    colorScheme="purple"
                    mr={ 1 }
                    mb={ 1 }
                  >
                    {tag}
                  </Badge>
                ))}
            </Flex>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default DoneRecipes;
