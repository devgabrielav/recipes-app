import { useEffect, useState } from 'react';
import { Button, Container, Heading, Img } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import check from '../images/check.png';
import logout from '../images/logout.png';
import favorite from '../images/favorite.png';
import Footer from '../components/Footer';

function Profile() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const settedEmail = JSON.parse(localStorage.getItem('user') || '{}');
    setEmail(settedEmail.email);
  }, []);

  const deleteEmail = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header />
      <Container textAlign="center" flexDirection="column" display="flex">
        <Heading size="md" data-testid="profile-email" marginBottom="10px">
          {email}
        </Heading>
        <Button
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
          marginBottom="10px"
          marginTop="15px"
        >
          <Img src={ check } marginRight="10px" boxSize="2em" marginLeft="-23px" />
          Done Recipes
        </Button>
        <Button
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
          marginBottom="10px"
        >
          <Img src={ favorite } marginRight="10px" boxSize="2em" />
          Favorite Recipes
        </Button>
        <Button
          data-testid="profile-logout-btn"
          onClick={ deleteEmail }
          marginBottom="10px"
        >
          <Img src={ logout } marginLeft="-72px" marginRight="10px" boxSize="2em" />
          Logout
        </Button>
      </Container>
      <Footer />
    </>
  );
}

export default Profile;
