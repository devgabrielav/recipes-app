import { ReactNode } from 'react';
import { Box, Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import Header from './Header';
import Footer from './Footer';
import ApiBanner from './ApiBanner';

type PageProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: IconType;
  iconColor?: string;
  /** Slot à direita do título (ex.: contador). */
  aside?: ReactNode;
  /** Remove o container/cabeçalho de título (páginas com layout próprio). */
  bare?: boolean;
  /** Espaço extra embaixo para uma barra de ação fixa (celular). */
  withActionBar?: boolean;
};

export default function Page({
  children, title, subtitle, icon, iconColor = 'brand', aside, bare = false,
  withActionBar = false,
}: PageProps) {
  return (
    <Flex direction="column" minH="100dvh">
      <Header />
      <ApiBanner />
      <Box
        as="main"
        flex={ 1 }
        pb={ {
          base: withActionBar
            ? 'calc(150px + env(safe-area-inset-bottom))'
            : 'calc(96px + env(safe-area-inset-bottom))',
          md: withActionBar ? 28 : 12,
        } }
      >
        {bare ? children : (
          <Container maxW="1200px" px={ { base: 4, md: 6 } } pt={ { base: 5, md: 8 } }>
            {title && (
              <Flex align="center" gap={ 4 } mb={ { base: 5, md: 7 } }>
                {icon && (
                  <Flex
                    w={ { base: 12, md: 14 } }
                    h={ { base: 12, md: 14 } }
                    flexShrink={ 0 }
                    align="center"
                    justify="center"
                    borderRadius="2xl"
                    bg={ `${iconColor}.50` }
                    color={ `${iconColor}.600` }
                  >
                    <Icon as={ icon } boxSize={ 7 } aria-hidden />
                  </Flex>
                )}
                <Box flex={ 1 } minW={ 0 }>
                  <Heading as="h1" data-testid="page-title" size={ { base: 'lg', md: 'xl' } }>
                    {title}
                  </Heading>
                  {subtitle && <Text color="ink.400" mt={ 0.5 }>{subtitle}</Text>}
                </Box>
                {aside}
              </Flex>
            )}
            {children}
          </Container>
        )}
      </Box>
      <Footer />
    </Flex>
  );
}
