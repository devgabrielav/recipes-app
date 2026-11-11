/* eslint-disable max-lines, react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FiBookOpen, FiCheckCircle, FiSearch } from 'react-icons/fi';
import { MdLocalBar, MdRestaurant } from 'react-icons/md';
import Page from '../components/Layout/Page';
import Login from '../components/Login/Login';
import { FeaturedCard } from '../components/FeaturedCard';
import { getRandomRecipe } from '../helper/helpersAPI';
import { ProductDetailsConverter } from '../helper/dataConverters';
import { useApiStatus } from '../helper/apiStatus';
import { getUser, STORAGE_KEYS } from '../helper/storage';
import { useI18n } from '../i18n/I18nProvider';
import { Featured, RecipeKind } from '../utils/types';

export default function Landing() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { version } = useApiStatus();
  const [user, setUser] = useState(getUser().email);
  const [featured, setFeatured] = useState<Featured[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const kinds: RecipeKind[] = ['meals', 'drinks', 'meals'];
      const found = await Promise.all(kinds.map((kind) => getRandomRecipe(kind)));

      if (cancelled) return;

      const seen = new Set<string>();
      const items: Featured[] = [];

      found.forEach((raw, i) => {
        const recipe = raw ? ProductDetailsConverter(raw) : null;
        if (recipe && !seen.has(recipe.id)) {
          seen.add(recipe.id);
          items.push({ kind: kinds[i], recipe });
        }
      });

      setFeatured(items);
    })();

    return () => { cancelled = true; };
  }, [version]);

  const switchAccount = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.user);
    } catch { /* noop */ }
    setUser(undefined);
  };

  const features = [
    { icon: FiSearch, title: t('feature1Title'), text: t('feature1Text') },
    { icon: FiBookOpen, title: t('feature2Title'), text: t('feature2Text') },
    { icon: FiCheckCircle, title: t('feature3Title'), text: t('feature3Text') },
  ];
  const rotations = ['-3deg', '2.5deg', '-1.5deg'];
  const name = user ? user.split('@')[0] : '';

  return (
    <Page bare>
      <Box
        bgGradient={
          'radial(circle at 85% 10%, brand.100 0%, transparent 45%), '
          + 'radial(circle at 5% 90%, basil.50 0%, transparent 40%)'
        }
      >
        <Container
          maxW="1200px"
          px={ { base: 4, md: 6 } }
          py={ { base: 8, lg: 16 } }
        >
          <Grid
            templateColumns={ { base: '1fr', lg: '1.05fr 1fr' } }
            gap={ { base: 10, lg: 14 } }
            alignItems="center"
          >
            <Stack spacing={ 6 }>
              <Badge
                alignSelf="flex-start"
                colorScheme="basil"
                borderRadius="full"
                px={ 3 }
                py={ 1 }
                textTransform="none"
                fontSize="sm"
              >
                {t('heroBadge')}
              </Badge>

              <Heading
                as="h1"
                data-testid="landing-title"
                fontSize={ { base: '4xl', md: '5xl', xl: '6xl' } }
                lineHeight={ 1.05 }
              >
                {t('heroTitle')}
              </Heading>

              <Text
                fontSize={ { base: 'md', md: 'lg' } }
                color="ink.400"
                maxW="540px"
              >
                {t('heroSubtitle')}
              </Text>

              <Box
                bg="white"
                borderRadius="2xl"
                boxShadow="card"
                p={ { base: 5, md: 6 } }
                maxW="480px"
                w="100%"
              >
                {user ? (
                  <Stack spacing={ 4 } data-testid="welcome-back">
                    <Heading as="h2" size="md" fontFamily="body">
                      {t('welcomeBack', { name })}
                    </Heading>

                    <Text color="ink.400">{t('welcomeBackText')}</Text>

                    <Flex gap={ 3 } direction={ { base: 'column', sm: 'row' } }>
                      <Button
                        flex={ 1 }
                        p={ { base: 2, sm: 4 } }
                        leftIcon={ <MdRestaurant /> }
                        onClick={ () => navigate('/meals') }
                      >
                        {t('goToMeals')}
                      </Button>

                      <Button
                        flex={ 1 }
                        p={ { base: 2, sm: 4 } }
                        colorScheme="grape"
                        leftIcon={ <MdLocalBar /> }
                        onClick={ () => navigate('/drinks') }
                      >
                        {t('goToDrinks')}
                      </Button>
                    </Flex>

                    <Button
                      type="button"
                      variant="link"
                      fontSize="sm"
                      color="ink.300"
                      onClick={ switchAccount }
                      alignSelf="flex-start"
                    >
                      {user}
                      {' '}
                      ·
                      {' '}
                      {t('signIn')}
                    </Button>
                  </Stack>
                ) : <Login key={ lang } /> }
              </Box>
            </Stack>

            <Box aria-label={ t('featuredTitle') } role="region">
              <Box mb={ 3 } display="flex" alignItems="center" gap={ 2 } flexWrap="wrap">
                <Text fontWeight={ 700 } color="ink.400">
                  {t('featuredTitle')}
                </Text>
                <Text as="span" fontWeight={ 400 } color="ink.300">
                  ·
                  {' '}
                  {t('featuredHint')}
                </Text>
              </Box>

              <SimpleGrid
                columns={ { base: 2, sm: 3 } }
                spacing={ { base: 3, lg: 5 } }
              >
                {featured === null
                  ? [0, 1, 2].map((i) => (
                    <Skeleton
                      key={ i }
                      borderRadius="2xl"
                      h={ { base: '170px', lg: '250px' } }
                    />
                  ))
                  : featured.map((item, i) => (
                    <Box
                      key={ item.recipe.id }
                      mt={ { lg: i === 1 ? 8 : 0 } }
                      display={ { base: i === 2 ? 'none' : 'block', sm: 'block' } }
                    >
                      <FeaturedCard item={ item } rotate={ rotations[i] } />
                    </Box>
                  ))}
              </SimpleGrid>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Container maxW="1200px" px={ { base: 4, md: 6 } } pb={ 6 }>
        <Heading as="h2" size="lg" textAlign="center" mb={ 8 }>
          {t('featuresTitle')}
        </Heading>
        <SimpleGrid columns={ { base: 1, md: 3 } } spacing={ 5 }>
          {features.map((feature) => (
            <Box
              key={ feature.title }
              bg="white"
              p={ 6 }
              borderRadius="2xl"
              boxShadow="card"
            >
              <Flex
                w={ 12 }
                h={ 12 }
                align="center"
                justify="center"
                borderRadius="xl"
                bg="basil.50"
                color="basil.600"
                mb={ 4 }
              >
                <Icon as={ feature.icon } boxSize={ 6 } aria-hidden />
              </Flex>
              <Heading as="h3" size="md" fontFamily="body" mb={ 2 }>
                {feature.title}
              </Heading>
              <Text color="ink.400">{feature.text}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Page>
  );
}
