import { ReactNode } from 'react';
import { Box, Text } from '@chakra-ui/react';

/** Botão de ação principal flutuante (fica acima da barra de abas no celular). */
export default function ActionBar({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <Box
      position="fixed"
      left={ 0 }
      right={ 0 }
      bottom={ { base: 'calc(72px + env(safe-area-inset-bottom))', md: 4 } }
      zIndex={ 25 }
      px={ 4 }
      pointerEvents="none"
    >
      <Box
        maxW="520px"
        mx="auto"
        pointerEvents="auto"
        boxShadow="lift"
        borderRadius="xl"
        bg="cream.100"
        overflow="hidden"
      >
        {children}
        {hint && (
          <Text
            mt={ 1 }
            textAlign="center"
            fontSize="xs"
            color="ink.400"
            pb={ 1 }
            px={ 2 }
          >
            {hint}
          </Text>
        )}
      </Box>
    </Box>
  );
}
