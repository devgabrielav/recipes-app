import { useState } from 'react';
import { Flex, Image, ImageProps } from '@chakra-ui/react';

type Props = Omit<ImageProps, 'src'> & {
  src?: string;
  alt: string;
  kind?: 'meal' | 'drink';
};

/** Imagem com fallback elegante (a API de imagens também pode estar fora do ar). */
export default function RecipeImage({ src, alt, kind = 'meal', ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <Flex
        role="img"
        aria-label={ alt }
        align="center"
        justify="center"
        bgGradient="linear(to-br, brand.100, cream.200)"
        fontSize="4xl"
        w={ rest.w ?? '100%' }
        h={ rest.h ?? '100%' }
        borderRadius={ rest.borderRadius }
        data-testid={ rest['data-testid' as keyof typeof rest] as string | undefined }
      >
        <span aria-hidden>{kind === 'drink' ? '🍹' : '🍽️'}</span>
      </Flex>
    );
  }
  return (
    <Image
      src={ src }
      alt={ alt }
      loading="lazy"
      objectFit="cover"
      onError={ () => setFailed(true) }
      { ...rest }
    />
  );
}
