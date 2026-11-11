import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helper/renderWithRouter';
import Login from '../components/Login/Login';
import { mockApiDown } from './fixtures';

const email = 'teste@teste.com';

describe('Login (somente e-mail, sem senha)', () => {
  beforeEach(() => { mockApiDown(); });

  it('não exige senha', () => {
    renderWithRouter(<Login />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.queryByTestId('password-input')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/password|senha/i)).not.toBeInTheDocument();
  });

  it('habilita o botão só com e-mail válido', async () => {
    const { user } = renderWithRouter(<Login />);
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();

    await user.type(screen.getByTestId('email-input'), 'invalido');
    expect(button).toBeDisabled();

    await user.clear(screen.getByTestId('email-input'));
    await user.type(screen.getByTestId('email-input'), email);
    expect(button).toBeEnabled();
  });

  it('mostra erro de e-mail inválido ao sair do campo', async () => {
    const { user } = renderWithRouter(<Login />);
    await user.type(screen.getByTestId('email-input'), 'abc');
    await user.tab();
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('salva o e-mail no localStorage e vai para /meals', async () => {
    const { user } = renderWithRouter(<Login />);
    await user.type(screen.getByTestId('email-input'), email);
    await user.click(screen.getByTestId('login-submit-btn'));

    expect(JSON.parse(localStorage.getItem('user') || '{}')).toEqual({ email });
    expect(window.location.pathname).toBe('/meals');
  });

  it('Enter no campo envia o formulário', async () => {
    const { user } = renderWithRouter(<Login />);
    await user.type(screen.getByTestId('email-input'), `${email}{Enter}`);
    expect(window.location.pathname).toBe('/meals');
  });

  it('permite explorar como visitante sem salvar nada', async () => {
    const { user } = renderWithRouter(<Login />);
    await user.click(screen.getByTestId('guest-btn'));
    expect(window.location.pathname).toBe('/meals');
    expect(localStorage.getItem('user')).toBeNull();
  });
});
