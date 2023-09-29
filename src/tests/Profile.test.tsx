import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from '../helper/renderWithRouter';

const testEmail = 'teste@teste.com';
const testPassword = '1234567';
const done = 'Done Recipes';
const fav = 'Favorite Recipes';

describe('Testa página do profile', () => {
  it('Header tem o profile e não tem o botão de busca e Footer está na página', () => {
    renderWithRouter(<App />, { route: '/profile' });

    expect(screen.queryByRole('img', { name: 'Search Icon' })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Profile Icon' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Drink' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Meals' })).toBeInTheDocument();
  });

  it('Texto Profile está na página, e 3 botões estão na tela', () => {
    renderWithRouter(<App />, { route: '/profile' });

    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: done })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: fav })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('Testa se o email correto aparece na tela', async () => {
    const { user } = renderWithRouter(<App />);

    const emailInput = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const enterButton = screen.getByRole('button', { name: 'ENTER' });

    await user.type(emailInput, testEmail);
    await user.type(inputPassword, testPassword);
    await user.click(enterButton);
    await user.click(screen.getByRole('img', { name: 'Profile Icon' }));

    expect(screen.getByText(testEmail)).toBeInTheDocument();
  });

  it('Testa se botão Done Recipes funciona', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    await user.click(screen.getByRole('button', { name: done }));

    expect(screen.getByRole('heading', { name: done })).toBeInTheDocument();
  });

  it('Testa se botão Favorite Recipes funciona', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    await user.click(screen.getByRole('button', { name: fav }));

    expect(screen.getByRole('heading', { name: fav })).toBeInTheDocument();
  });

  it('Testa se botão Logout funciona', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    await user.click(screen.getByRole('button', { name: 'Logout' }));

    expect(screen.getByRole('heading', { name: 'LOGIN' })).toBeInTheDocument();
  });
});
