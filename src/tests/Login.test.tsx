import { screen } from '@testing-library/dom';
import { renderWithRouter } from '../helper/renderWithRouter';
import Login from '../components/Login';

const testEmail = 'teste@teste.com';
const testPassword = '1234567';
const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const buttonTestId = 'login-submit-btn';

describe('Testa tela de login', () => {
  it('Elementos estão na tela', () => {
    renderWithRouter(<Login />);

    expect(screen.getByTestId(emailTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
  });
  it('É possível digitar nos inputs e seus valores são alterados', async () => {
    const { user } = renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);

    await user.type(inputEmail, testEmail);
    await user.type(inputPassword, testPassword);

    expect(inputEmail).toHaveValue(testEmail);
    expect(inputPassword).toHaveValue(testPassword);
  });

  it('Testa se botão é habilitado se email e senha estão corretos, e se desabilita da forma correta', async () => {
    const { user } = renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const buttonEnter = screen.getByTestId(buttonTestId);

    expect(buttonEnter).toBeDisabled();

    await user.type(inputEmail, testEmail);
    await user.type(inputPassword, testPassword);

    expect(buttonEnter).not.toBeDisabled();
  });
});
