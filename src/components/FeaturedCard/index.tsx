import { Link as RouterLink } from 'react-router-dom';
import {
  AspectRatio, Badge, Box, Link, Text,
} from '@chakra-ui/react';
import { useI18n } from '../../i18n/I18nProvider';
import RecipeImage from '../RecipeImage';
import { Featured } from '../../utils/types';

export function FeaturedCard({ item, rotate }: { item: Featured; rotate: string }) {
  const { category } = useI18n();
  const { kind, recipe } = item;
  return (
    <Link
      as={ RouterLink }
      to={ `/${kind}/${recipe.id}` }
      data-testid={ `featured-${kind}` }
      display="block"
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lift"
      transform={ { base: 'none', lg: `rotate(${rotate})` } }
      transition="transform .25s ease"
      _hover={ { textDecoration: 'none', transform: 'rotate(0deg) translateY(-6px)' } }
    >
      <AspectRatio ratio={ 4 / 3 }>
        <RecipeImage
          src={ recipe.img }
          alt={ recipe.str }
          kind={ kind === 'meals' ? 'meal' : 'drink' }
        />
      </AspectRatio>
      <Box p={ 3 }>
        <Badge
          colorScheme={ kind === 'meals' ? 'brand' : 'grape' }
          borderRadius="full"
          mb={ 1 }
        >
          {category(recipe.strCategory)}
        </Badge>
        <Text fontWeight={ 700 } noOfLines={ 1 }>{recipe.str}</Text>
      </Box>
    </Link>
  );
}
