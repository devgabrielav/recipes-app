import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { useI18n } from '../../i18n/I18nProvider';
import { NAV_ITEMS } from './navItems';

/** Barra de abas inferior (somente celular/tablet pequeno). */
export default function Footer() {
  const { pathname } = useLocation();
  const { t } = useI18n();

  return (
    <Box
      as="footer"
      data-testid="footer"
      display={ { base: 'block', md: 'none' } }
      position="fixed"
      bottom={ 0 }
      left={ 0 }
      right={ 0 }
      zIndex={ 30 }
      bg="white"
      borderTop="1px solid"
      borderColor="cream.300"
      boxShadow="0 -8px 24px rgba(42,30,22,.08)"
      pb="env(safe-area-inset-bottom)"
    >
      <Flex as="nav" aria-label={ t('navMain') } maxW="560px" mx="auto" justify="space-around">
        {NAV_ITEMS.filter((item) => item.mobile).map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={ item.key }
              as={ RouterLink }
              to={ item.to }
              data-testid={ item.testId }
              aria-current={ active ? 'page' : undefined }
              flex={ 1 }
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={ 0.5 }
              py={ 2 }
              color={ active ? 'brand.600' : 'ink.300' }
              fontWeight={ active ? 700 : 500 }
              _hover={ { textDecoration: 'none', color: 'brand.500' } }
            >
              <Flex
                px={ 4 }
                py={ 1 }
                borderRadius="full"
                bg={ active ? 'brand.50' : 'transparent' }
              >
                <Icon as={ item.icon } boxSize={ 5 } aria-hidden />
              </Flex>
              <Text fontSize="2xs" lineHeight="short" noOfLines={ 1 }>{t(item.label)}</Text>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
