import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Button, Flex, Heading, SimpleGrid, Stack, Text,
} from '@chakra-ui/react';
import {
  FiCheckCircle, FiClock, FiHeart, FiLogIn, FiLogOut, FiTrash2,
} from 'react-icons/fi';
import Page from '../components/Layout/Page';
import {
  clearAllData, getDoneRecipes, getFavorites, getInProgress, getUser, STORAGE_KEYS,
} from '../helper/storage';
import { useI18n } from '../i18n/I18nProvider';

function Stat({ value, label, testId }: { value: number; label: string; testId: string }) {
  return (
    <Box bg="white" borderRadius="2xl" boxShadow="card" p={ 4 } textAlign="center">
      <Text fontFamily="heading" fontSize="3xl" fontWeight={ 800 } lineHeight={ 1 } data-testid={ testId }>
        {value}
      </Text>
      <Text color="ink.400" fontSize="sm" mt={ 1 }>{label}</Text>
    </Box>
  );
}

function Profile() {
  const [email, setEmail] = useState(getUser().email ?? '');
  const navigate = useNavigate();
  const { t } = useI18n();

  const inProgress = getInProgress();
  const stats = {
    favorites: getFavorites().length,
    done: getDoneRecipes().length,
    inProgress: Object.keys(inProgress.meals).length + Object.keys(inProgress.drinks).length,
  };

  const logout = () => {
    try { localStorage.removeItem(STORAGE_KEYS.user); } catch { /* noop */ }
    setEmail('');
    navigate('/');
  };

  const eraseData = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('clearDataConfirm'))) {
      clearAllData();
      logout();
    }
  };

  return (
    <Page title={ t('titleProfile') }>
      <Stack spacing={ 6 } maxW="640px">
        <Flex align="center" gap={ 4 } bg="white" borderRadius="2xl" boxShadow="card" p={ 5 }>
          <Avatar name={ email || t('guest') } bg="brand.500" color="white" size="lg" />
          <Box minW={ 0 }>
            {email ? (
              <>
                <Text color="ink.400" fontSize="sm">{t('signedInAs')}</Text>
                <Heading size="md" data-testid="profile-email" fontFamily="body" wordBreak="break-all">
                  {email}
                </Heading>
              </>
            ) : (
              <>
                <Heading size="md" fontFamily="body" data-testid="profile-guest">{t('guest')}</Heading>
                <Text color="ink.400" fontSize="sm">{t('guestText')}</Text>
              </>
            )}
          </Box>
        </Flex>

        <SimpleGrid columns={ 3 } spacing={ 3 }>
          <Stat value={ stats.favorites } label={ t('statFavorites') } testId="stat-favorites" />
          <Stat value={ stats.done } label={ t('statDone') } testId="stat-done" />
          <Stat value={ stats.inProgress } label={ t('statInProgress') } testId="stat-in-progress" />
        </SimpleGrid>

        <Stack spacing={ 3 }>
          <Button
            data-testid="profile-in-progress-btn"
            variant="outline"
            bg="white"
            justifyContent="flex-start"
            leftIcon={ <FiClock /> }
            onClick={ () => navigate('/in-progress') }
          >
            {t('titleInProgress')}
          </Button>
          <Button
            data-testid="profile-done-btn"
            variant="outline"
            bg="white"
            justifyContent="flex-start"
            leftIcon={ <FiCheckCircle /> }
            onClick={ () => navigate('/done-recipes') }
          >
            {t('titleDone')}
          </Button>
          <Button
            data-testid="profile-favorite-btn"
            variant="outline"
            bg="white"
            justifyContent="flex-start"
            leftIcon={ <FiHeart /> }
            onClick={ () => navigate('/favorite-recipes') }
          >
            {t('titleFavorites')}
          </Button>
          {email ? (
            <Button
              data-testid="profile-logout-btn"
              justifyContent="flex-start"
              leftIcon={ <FiLogOut /> }
              onClick={ logout }
            >
              {t('logout')}
            </Button>
          ) : (
            <Button
              data-testid="profile-login-btn"
              justifyContent="flex-start"
              leftIcon={ <FiLogIn /> }
              onClick={ () => navigate('/') }
            >
              {t('signIn')}
            </Button>
          )}
          <Button
            variant="ghost"
            colorScheme="red"
            size="sm"
            leftIcon={ <FiTrash2 /> }
            onClick={ eraseData }
          >
            {t('clearData')}
          </Button>
        </Stack>
      </Stack>
    </Page>
  );
}

export default Profile;
