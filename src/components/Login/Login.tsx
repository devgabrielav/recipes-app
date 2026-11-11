import { ChangeEvent, FormEvent, useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import {
  Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack,
} from '@chakra-ui/react';
import { saveUser } from '../../helper/storage';
import { useI18n } from '../../i18n/I18nProvider';

/** Entrada só com e-mail (sem senha). O e-mail fica salvo apenas neste dispositivo. */
export default function Login() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  const valid = validator.isEmail(email);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!valid) {
      setTouched(true);
      return;
    }
    saveUser(email);
    navigate('/meals');
  };

  return (
    <Stack as="form" onSubmit={ submit } noValidate spacing={ 4 }>
      <FormControl isInvalid={ touched && !valid }>
        <FormLabel>{t('emailLabel')}</FormLabel>
        <Input
          type="email"
          name="email"
          data-testid="email-input"
          autoComplete="email"
          placeholder={ t('emailPlaceholder') }
          value={ email }
          onChange={ handleChange }
          onBlur={ () => setTouched(email.length > 0) }
          size="lg"
        />
        {touched && !valid
          ? <FormErrorMessage>{t('invalidEmail')}</FormErrorMessage>
          : <FormHelperText>{t('noPasswordHint')}</FormHelperText>}
      </FormControl>
      <Button type="submit" size="lg" data-testid="login-submit-btn" isDisabled={ !valid }>
        {t('enter')}
      </Button>
      <Button
        variant="ghost"
        data-testid="guest-btn"
        onClick={ () => navigate('/meals') }
      >
        {t('continueAsGuest')}
      </Button>
    </Stack>
  );
}
