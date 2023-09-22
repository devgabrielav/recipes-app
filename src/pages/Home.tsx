import { Container } from '@chakra-ui/react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Home() {
  return (
    <Container
      width={ 360 }
      height={ 640 }
    >
      <Header />
      <Recipes />
    </Container>
  );
}
