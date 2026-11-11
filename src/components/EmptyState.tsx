import { ReactNode } from 'react';
import { Box, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  title: string;
  text?: string;
  children?: ReactNode;
  testId?: string;
};

export default function EmptyState({ icon, title, text, children, testId }: Props) {
  return (
    <VStack
      data-testid={ testId }
      spacing={ 3 }
      textAlign="center"
      py={ { base: 12, md: 16 } }
      px={ 6 }
      bg="white"
      borderRadius="2xl"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="cream.300"
    >
      <Box p={ 4 } bg="brand.50" color="brand.500" borderRadius="full">
        <Icon as={ icon } boxSize={ 8 } aria-hidden />
      </Box>
      <Heading as="h2" size="md">{title}</Heading>
      {text && <Text color="ink.400" maxW="420px">{text}</Text>}
      {children}
    </VStack>
  );
}
