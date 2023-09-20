import { ChangeEvent, useState } from 'react';
import validator from 'validator';
import LoginContext, { LoginType } from '../context/LoginContext';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [valueInputs, setValueInputs] = useState<LoginType>({
    email: '',
    password: '',
  });

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

  const saveEmail = () => localStorage.setItem('user', JSON
    .stringify({ email: valueInputs.email }));

  return (
    <LoginContext.Provider value={ valueInputs }>
      <div>
        <h2>Login</h2>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ saveEmail }
        >
          Enter
        </button>
      </div>
    </LoginContext.Provider>
  );
}

export default Login;
