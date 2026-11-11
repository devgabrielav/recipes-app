import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box, Collapse, Flex, HStack, Icon, IconButton, Link, Spacer, Text,
} from '@chakra-ui/react';
import { FiSearch, FiUser, FiX } from 'react-icons/fi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { useI18n } from '../../i18n/I18nProvider';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from '../SearchBar/SearchBar';
import { NAV_ITEMS } from './navItems';

export default function Header() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false);
  const canSearch = pathname === '/meals' || pathname === '/drinks';

  useEffect(() => { setSearchOpen(false); }, [pathname]);

  return (
    <Box
      as="header"
      position="sticky"
      top={ 0 }
      zIndex={ 20 }
      bg="rgba(255, 249, 243, 0.9)"
      backdropFilter="saturate(180%) blur(12px)"
      borderBottom="1px solid"
      borderColor="cream.300"
      pt="env(safe-area-inset-top)"
    >
      <Flex maxW="1200px" mx="auto" px={ { base: 3, md: 6 } } h="64px" align="center" gap={ 3 }>
        <Link
          as={ RouterLink }
          to="/"
          display="flex"
          alignItems="center"
          gap={ 2 }
          _hover={ { textDecoration: 'none' } }
          aria-label={ `${t('appName')} - ${t('navHome')}` }
        >
          <Flex
            w={ 10 }
            h={ 10 }
            align="center"
            justify="center"
            borderRadius="xl"
            bgGradient="linear(to-br, brand.400, brand.600)"
            color="white"
            boxShadow="card"
          >
            <Icon as={ GiForkKnifeSpoon } boxSize={ 6 } aria-hidden />
          </Flex>
          <Text
            fontFamily="heading"
            fontWeight={ 800 }
            fontSize="xl"
            color="ink.500"
            display={ { base: 'none', sm: 'block' } }
          >
            {t('appName')}
          </Text>
        </Link>

        <HStack
          as="nav"
          aria-label={ t('navMain') }
          display={ { base: 'none', md: 'flex' } }
          ml={ 6 }
          spacing={ 1 }
        >
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={ item.key }
                as={ RouterLink }
                to={ item.to }
                aria-current={ active ? 'page' : undefined }
                data-testid={ `nav-${item.key}` }
                display="flex"
                alignItems="center"
                gap={ 2 }
                px={ 3 }
                py={ 2 }
                borderRadius="xl"
                fontWeight={ 700 }
                fontSize="sm"
                color={ active ? 'brand.600' : 'ink.400' }
                bg={ active ? 'brand.50' : 'transparent' }
                _hover={ { textDecoration: 'none', bg: active ? 'brand.50' : 'cream.200' } }
              >
                <Icon as={ item.icon } aria-hidden />
                {t(item.label)}
              </Link>
            );
          })}
        </HStack>

        <Spacer />

        {canSearch && (
          <IconButton
            aria-label={ searchOpen ? t('closeSearch') : t('navSearch') }
            aria-expanded={ searchOpen }
            data-testid="search-top-btn"
            icon={ <Icon as={ searchOpen ? FiX : FiSearch } boxSize={ 5 } /> }
            onClick={ () => setSearchOpen((open) => !open) }
            variant="ghost"
            colorScheme="brand"
            borderRadius="full"
          />
        )}
        <LanguageSwitcher />
        <IconButton
          as={ RouterLink }
          to="/profile"
          aria-label={ t('navProfile') }
          data-testid="profile-top-btn"
          icon={ <Icon as={ FiUser } boxSize={ 5 } /> }
          variant={ pathname === '/profile' ? 'solid' : 'ghost' }
          colorScheme="brand"
          borderRadius="full"
        />
      </Flex>

      {canSearch && (
        <Collapse in={ searchOpen } unmountOnExit animateOpacity>
          <Box maxW="1200px" mx="auto" px={ { base: 3, md: 6 } } pb={ 4 }>
            <SearchBar onDone={ () => setSearchOpen(false) } />
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
