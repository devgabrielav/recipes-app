import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AspectRatio, Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import RecipeImage from '../RecipeImage';
import TypeBadge from '../TypeBadge';
import { useI18n } from '../../i18n/I18nProvider';
import { FavoriteRecipeType } from '../../utils/types';

type Props = {
  recipe: FavoriteRecipeType;
  index: number;
  /** Conteúdo extra (data, tags). */
  extra?: ReactNode;
  /** Botões de ação. */
  actions: ReactNode;
};

/** Cartão horizontal usado em "Favoritas" e "Feitas". */
export default function RecipeSavedCard({ recipe, index, extra, actions }: Props) {
  const { category, area } = useI18n();
  const isMeal = recipe.type === 'meal';
  const to = `/${isMeal ? 'meals' : 'drinks'}/${recipe.id}`;
  const topText = isMeal
    ? `${area(recipe.nationality)} - ${category(recipe.category)}`
    : category(recipe.alcoholicOrNot);

  return (
    <Flex
      as="article"
      data-testid={ `${index}-saved-card` }
      direction={ { base: 'column', sm: 'row' } }
      bg="white"
      borderRadius="2xl"
      boxShadow="card"
      overflow="hidden"
    >
      <Link
        as={ RouterLink }
        to={ to }
        flexShrink={ 0 }
        w={ { base: '100%', sm: '200px' } }
        aria-label={ recipe.name }
        tabIndex={ -1 }
      >
        <AspectRatio ratio={ { base: 16 / 9, sm: 1 } } h="100%">
          <RecipeImage
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            kind={ recipe.type as 'meal' | 'drink' }
          />
        </AspectRatio>
      </Link>
      <Flex direction="column" gap={ 2 } p={ 4 } flex={ 1 } minW={ 0 }>
        <Flex gap={ 2 } align="center" wrap="wrap">
          <TypeBadge type={ recipe.type } />
          <Text
            data-testid={ `${index}-horizontal-top-text` }
            fontSize="sm"
            color="ink.400"
          >
            {topText}
          </Text>
        </Flex>
        <Heading as="h3" size="md" fontFamily="body" noOfLines={ 2 }>
          <Link
            as={ RouterLink }
            to={ to }
            data-testid={ `${index}-horizontal-name` }
            _hover={ { color: 'brand.600', textDecoration: 'none' } }
          >
            {recipe.name}
          </Link>
        </Heading>
        {extra}
        <Box mt="auto" pt={ 1 }>{actions}</Box>
      </Flex>
    </Flex>
  );
}
