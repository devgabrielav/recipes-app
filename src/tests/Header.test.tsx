import { screen } from '@testing-library/dom';
import Header from '../components/Header';
import { renderWithRouter } from '../helper/renderWithRouter';

const recipesAppIcon = '/src/images/recipesAppIcon.svg';
const recipesAppTitle = '/src/images/recipesAppTitle.svg';
const searchIcon = '/src/images/searchIcon.svg';
const drinksIcon = '/src/images/drinkIcon.svg';
const mealsIcon = '/src/images/mealIcon.svg';

describe('Header é exibido corretamente ', () => {
  it(`a primeira tag img contem o src '${recipesAppIcon}'`, () => {
    renderWithRouter(<Header />, { route: '/meals' });
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', recipesAppIcon);
  });

  it('Na rota /meals renderiza a imagem de meal ', () => {
    renderWithRouter(<Header />, { route: '/meals' });
    expect(screen.getByTestId('typeRoute')).toHaveAttribute('src', mealsIcon);
  });

  it('Na rota /drinks renderiza a imagem de drinks', () => {
    renderWithRouter(<Header />, { route: '/drinks' });
    expect(screen.getByTestId('typeRoute')).toHaveAttribute('src', drinksIcon);
  });

  it(`a segunda tag img contem o src '${recipesAppTitle}'`, () => {
    renderWithRouter(<Header />, { route: '/meals' });
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', recipesAppTitle);
  });

  it(`o primeiro botão contem uma imagem com o src '${searchIcon}'`, () => {
    renderWithRouter(<Header />, { route: '/meals' });
    const firstButton = screen.getAllByRole('button')[0];
    const imageInsideButton = firstButton.querySelector('img');
    expect(imageInsideButton).toHaveAttribute('src', searchIcon);
  });

  it('ao clicar no botão de busca a barra de busca é exibida', async () => {
    renderWithRouter(<Header />, { route: '/meals' });
    const firstButton = screen.getAllByRole('button')[0];
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    await firstButton.click();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('o segundo botão é um link para o componente de perfil', async () => {
    renderWithRouter(<Header />, { route: '/meals' });
    const profileLink = screen.getByRole('link');
    expect(profileLink).toHaveAttribute('href', '/profile');
  });

  it('existe um h1 com o texto esperado', async () => {
    renderWithRouter(<Header />, { route: '/meals' });
    expect(screen.getByRole('heading')).toHaveTextContent('Meals');
    const profileLink = screen.getByRole('link');
    await profileLink.click();
    expect(screen.getByRole('heading')).toHaveTextContent('Profile');
  });
});
