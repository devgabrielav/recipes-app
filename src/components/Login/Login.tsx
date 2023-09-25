import { ChangeEvent, useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Img, Container, Heading } from '@chakra-ui/react';
import login from '../../images/login.png';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [valueInputs, setValueInputs] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValueInputs({
      ...valueInputs,
      [name]: value,
    });
    const validateEmail = validator.isEmail(valueInputs.email);

    if (validateEmail && valueInputs.password.length > 5) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const saveEmail = () => {
    localStorage.setItem('user', JSON.stringify({ email: valueInputs.email }));
    navigate('/meals');
  };

  return (
    <Container
      maxW="360px"
      maxH="640px"
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Img
        src={ login }
        alt="login"
        position="absolute"
        zIndex="-1"
      />
      <Heading
        position="relative"
        top="500px"
        fontFamily="Epilogue"
        fontWeight="500"
        width="182px"
        height="21px"
        marginTop="7px"
        marginBottom="25px"
        fontSize="30px"
        fontStyle="italic"
        color="#41197F"
      >
        LOGIN
      </Heading>
      <Input
        type="email"
        data-testid="email-input"
        name="email"
        onChange={ handleChange }
        placeholder="Email"
        width="276px"
        colorScheme="purple"
        border="0.5px solid #41197F"
        _placeholder={ { color: '#41197F' } }
        fontFamily="epilogue"
        position="relative"
        top="510px"
        marginBottom="5px"
        color="#41197F"
      />
      <Input
        type="password"
        data-testid="password-input"
        name="password"
        onChange={ handleChange }
        placeholder="Password"
        width="276px"
        colorScheme="purple"
        border="0.5px solid #41197F"
        _placeholder={ { color: '#41197F' } }
        fontFamily="epilogue"
        position="relative"
        top="510px"
        color="#41197F"
      />
      <Button
        isDisabled={ isDisabled }
        data-testid="login-submit-btn"
        onClick={ saveEmail }
        colorScheme="yellow"
        position="relative"
        top="530px"
        width="276px"
        color="white"
        fontFamily="epilogue"
      >
        ENTER
      </Button>
    </Container>
  );
}
