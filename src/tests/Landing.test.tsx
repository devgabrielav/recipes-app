import { screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helper/renderWithRouter';
import { mockApi, mockApiDown, standardRoutes } from './fixtures';

describe('Página inicial e idioma', () => {
  it('mostra o formulário de e-mail (sem senha) para quem não entrou', async () => {
    mockApi({ ...standardRoutes, 'random.php': { meals: [] } });
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByTestId('landing-title')).toHaveTextContent('Cook something delicious today');
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.queryByTestId('password-input')).not.toBeInTheDocument();
  });

  it('cumprimenta quem já entrou e oferece comidas e bebidas', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'ana@teste.com' }));
    mockApiDown();
    renderWithRouter(<App />, { route: '/' });
    const welcome = screen.getByTestId('welcome-back');
    expect(within(welcome).getByText('Welcome back, ana!')).toBeInTheDocument();
    expect(screen.queryByTestId('email-input')).not.toBeInTheDocument();
  });

  it('troca entre português e inglês e lembra a escolha', async () => {
    mockApiDown();
    const { user } = renderWithRouter(<App />, { route: '/', lang: 'en' });
    await user.click(screen.getAllByTestId('lang-pt')[0]);

    expect(screen.getByTestId('landing-title')).toHaveTextContent('Cozinhe algo delicioso hoje');
    expect(JSON.parse(localStorage.getItem('recipesApp:lang') || '""')).toBe('pt');
    expect(document.documentElement.lang).toBe('pt-BR');

    await user.click(screen.getAllByTestId('lang-en')[0]);
    expect(screen.getByTestId('landing-title')).toHaveTextContent('Cook something delicious today');
  });

  it('exibe sugestões de exemplo quando a API está fora do ar', async () => {
    mockApiDown();
    renderWithRouter(<App />, { route: '/' });
    await waitFor(() => expect(screen.getAllByTestId(/^featured-/).length).toBeGreaterThan(0));
    expect(screen.getByTestId('api-banner')).toBeInTheDocument();
  });

  it('rota inexistente mostra a página 404 com link para o início', () => {
    mockApiDown();
    renderWithRouter(<App />, { route: '/nao-existe' });
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
