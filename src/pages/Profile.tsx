import { Container } from '@chakra-ui/react';
import Header from '../components/Header';

export default function Home() {
  return (
    <Container
      width={ 360 }
      height={ 640 }
    >
      <Header />
    </Container>
  );
}
