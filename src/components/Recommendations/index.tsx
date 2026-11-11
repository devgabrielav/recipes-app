import { useRef } from 'react';
import { Box, Flex, Heading, HStack, IconButton } from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import RecipeCard from '../RecipeCard';
import { useI18n } from '../../i18n/I18nProvider';
import { RecipeType } from '../../utils/types';

/** Carrossel horizontal com rolagem por toque e setas no desktop. */
export default function Recommendations({ recipes }: { recipes: RecipeType[] }) {
  const { t } = useI18n();
  const track = useRef<HTMLDivElement>(null);
  if (recipes.length === 0) return null;

  const scroll = (dir: 1 | -1) => track.current?.scrollBy({
    left: dir * (track.current.clientWidth * 0.8),
    behavior: 'smooth',
  });

  return (
    <Box as="section" mt={ { base: 8, md: 12 } } aria-labelledby="recs-title">
      <Flex align="center" justify="space-between" mb={ 4 }>
        <Heading as="h2" id="recs-title" size="lg">{t('recommended')}</Heading>
        <HStack display={ { base: 'none', md: 'flex' } }>
          <IconButton
            aria-label="‹"
            icon={ <FiArrowLeft /> }
            onClick={ () => scroll(-1) }
            variant="outline"
            bg="white"
            borderRadius="full"
          />
          <IconButton
            aria-label="›"
            icon={ <FiArrowRight /> }
            onClick={ () => scroll(1) }
            variant="outline"
            bg="white"
            borderRadius="full"
          />
        </HStack>
      </Flex>
      <Flex
        ref={ track }
        gap={ 4 }
        overflowX="auto"
        pb={ 3 }
        mx={ { base: -4, md: 0 } }
        px={ { base: 4, md: 0 } }
        sx={ {
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        } }
      >
        {recipes.map((recipe, index) => (
          <Box
            key={ recipe.idDrink || recipe.idMeal }
            data-testid={ `${index}-recommendation-card` }
            flex="0 0 auto"
            w={ { base: '60%', sm: '36%', md: '250px' } }
            sx={ { scrollSnapAlign: 'start' } }
          >
            <RecipeCard recipe={ recipe } index={ index } baseHeadTestId="recommendation-title" />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
