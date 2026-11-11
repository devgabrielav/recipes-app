import { useState } from 'react';
import {
  AspectRatio, Badge, Box, Flex, Heading, HStack, Icon, IconButton, Text,
} from '@chakra-ui/react';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import RecipeImage from '../RecipeImage';
import useShare from '../../hooks/useShare';
import { useI18n } from '../../i18n/I18nProvider';
import { isFavorite, saveToFavorites } from '../../helper/storage';
import { ProductDetailsType, RecipeKind } from '../../utils/types';

export const favoriteFrom = (recipe: ProductDetailsType, kind: RecipeKind) => ({
  id: recipe.id,
  type: kind === 'meals' ? 'meal' : 'drink',
  nationality: recipe.strArea || '',
  category: recipe.strCategory || '',
  alcoholicOrNot: kind === 'drinks' ? recipe.strAlcoholic || '' : '',
  name: recipe.str,
  image: recipe.img,
});

type Props = { recipe: ProductDetailsType; kind: RecipeKind };

export default function RecipeHero({ recipe, kind }: Props) {
  const { t, category, area } = useI18n();
  const share = useShare();
  const [favorite, setFavorite] = useState(() => isFavorite(recipe.id));
  const isMeal = kind === 'meals';
  const accent = isMeal ? 'brand' : 'grape';

  const toggleFavorite = () => setFavorite(saveToFavorites(favoriteFrom(recipe, kind)));

  return (
    <Flex
      direction={ { base: 'column', md: 'row' } }
      gap={ { base: 5, md: 8 } }
      align={ { md: 'center' } }
      mb={ { base: 6, md: 8 } }
    >
      <AspectRatio
        ratio={ 4 / 3 }
        w={ { base: '100%', md: '46%' } }
        maxW={ { md: '520px' } }
        flexShrink={ 0 }
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="lift"
      >
        <RecipeImage
          data-testid="recipe-photo"
          src={ recipe.img }
          alt={ recipe.str }
          kind={ isMeal ? 'meal' : 'drink' }
        />
      </AspectRatio>

      <Box flex={ 1 } minW={ 0 }>
        <HStack spacing={ 2 } mb={ 3 } wrap="wrap">
          <Badge colorScheme={ accent } borderRadius="full" px={ 3 } py={ 1 } textTransform="none">
            <span data-testid="recipe-category">
              {isMeal ? category(recipe.strCategory) : category(recipe.strAlcoholic || '')}
            </span>
          </Badge>
          {!isMeal && recipe.strCategory && (
            <Badge borderRadius="full" px={ 3 } py={ 1 } textTransform="none">
              {category(recipe.strCategory)}
            </Badge>
          )}
          {isMeal && recipe.strArea && (
            <Badge colorScheme="basil" borderRadius="full" px={ 3 } py={ 1 } textTransform="none">
              {area(recipe.strArea)}
            </Badge>
          )}
        </HStack>
        <Heading as="h1" data-testid="recipe-title" size={ { base: 'xl', md: '2xl' } } mb={ 4 }>
          {recipe.str}
        </Heading>
        <HStack spacing={ 2 }>
          <IconButton
            data-testid="share-btn"
            aria-label={ t('share') }
            icon={ <Icon as={ FiShare2 } boxSize={ 5 } /> }
            onClick={ () => share(`/${kind}/${recipe.id}`) }
            variant="outline"
            bg="white"
            borderRadius="full"
          />
          <IconButton
            data-testid="favorite-btn"
            aria-label={ favorite ? t('removeFavorite') : t('addFavorite') }
            aria-pressed={ favorite }
            icon={ <Icon as={ FiHeart } boxSize={ 5 } fill={ favorite ? 'currentColor' : 'none' } /> }
            onClick={ toggleFavorite }
            variant={ favorite ? 'solid' : 'outline' }
            bg={ favorite ? undefined : 'white' }
            borderRadius="full"
          />
        </HStack>
        <Text srOnly role="status">{favorite ? t('removeFavorite') : t('addFavorite')}</Text>
      </Box>
    </Flex>
  );
}
