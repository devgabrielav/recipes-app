import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helper/renderWithRouter';
import { mockApiDown } from './fixtures';

describe('Perfil', () => {
  beforeEach(() => { mockApiDown(); });

  it('mostra o e-mail e as estatísticas', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '1', type: 'meal' }]));
    renderWithRouter(<App />, { route: '/profile' });

    expect(screen.getByTestId('profile-email')).toHaveTextContent('teste@teste.com');
    expect(screen.getByTestId('stat-favorites')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-done')).toHaveTextContent('0');
  });

  it('visitante vê o botão de entrar em vez de sair', () => {
    renderWithRouter(<App />, { route: '/profile' });
    expect(screen.getByTestId('profile-guest')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-logout-btn')).not.toBeInTheDocument();
    expect(screen.getByTestId('profile-login-btn')).toBeInTheDocument();
  });

  it('atalhos levam às listas', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });
    await user.click(screen.getByTestId('profile-done-btn'));
    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('sair remove o e-mail mas mantém favoritas e idioma', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '1' }]));
    localStorage.setItem('recipesApp:lang', JSON.stringify('en'));
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    await user.click(screen.getByTestId('profile-logout-btn'));

    expect(window.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('favoriteRecipes')).not.toBeNull();
    expect(localStorage.getItem('recipesApp:lang')).not.toBeNull();
  });

  it('apagar dados limpa tudo, menos o idioma', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '1' }]));
    localStorage.setItem('recipesApp:lang', JSON.stringify('pt'));
    const { user } = renderWithRouter(<App />, { route: '/profile', lang: 'en' });

    await user.click(screen.getByText('Erase all data on this device'));

    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(localStorage.getItem('recipesApp:lang')).not.toBeNull();
  });
});
