import { fireEvent, screen } from '@testing-library/dom';
import { useContext } from 'react';
import Header from '../components/Header';
import { renderWithRouter } from '../helper/renderWithRouter';
import { layoutContext } from '../context/layout/layoutContext';
import LayoutProvider from '../context/layout/LayoutProvider';

const recipesAppIcon = '/src/images/recipesAppIcon.svg';
const recipesAppTitle = '/src/images/recipesAppTitle.svg';
const searchIcon = '/src/images/searchIcon.svg';

describe('Header é exibido corretamente ', () => {
  it(`a primeira tag img contem o src '${recipesAppIcon}'`, () => {
    renderWithRouter(<Header title="Testando" />);
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', recipesAppIcon);
  });

  it(`a segunda tag img contem o src '${recipesAppTitle}'`, () => {
    renderWithRouter(<Header title="Testando" />);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', recipesAppTitle);
  });

  it(`o primeiro botão contem uma imagem com o src '${searchIcon}'`, () => {
    renderWithRouter(<Header title="Testando" />);
    const firstButton = screen.getAllByRole('button')[0];
    const imageInsideButton = firstButton.querySelector('img');
    expect(imageInsideButton).toHaveAttribute('src', searchIcon);
  });

  it('ao clicar no botão de busca a barra de busca é exibida', async () => {
    renderWithRouter(<Header title="Testando" />);
    const firstButton = screen.getAllByRole('button')[0];
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    await firstButton.click();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('o segundo botão é um link para o componente de perfil', async () => {
    renderWithRouter(<Header title="Testando" />);
    const profileLink = screen.getByRole('link');
    expect(profileLink).toHaveAttribute('href', '/profile');
  });

  it('existe um h1 com o texto esperado', () => {
    renderWithRouter(<Header title="Testando" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Testando');
  });
  it('o botão de busca não é exibido quando disableSearch é true', () => {
    renderWithRouter(<Header title="Testando" disableSearch />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('o context é atualizado corretamente ao clicar no botão de busca', async () => {
    function Consumer() {
      const [layout] = useContext(layoutContext);
      return (
        <>
          <label data-testid="searchValue">{layout.searchValue}</label>

          <label data-testid="searchType">{layout.searchType}</label>
        </>
      );
    }
    renderWithRouter(
      <LayoutProvider>
        <Header title="Testando" />
        <Consumer />
      </LayoutProvider>,
    );
    const searchBtn = screen.getAllByRole('button')[0];
    await searchBtn.click();
    const searchValue = screen.getByTestId('searchValue');
    const searchType = screen.getByTestId('searchType');
    const input = screen.getByRole('textbox');
    const radios = screen.getAllByRole('radio');
    const submit = screen.getByText('SEARCH');
    expect(searchValue).toHaveTextContent('');
    expect(searchType).toHaveTextContent('ingredient');
    fireEvent.change(input, { target: { value: 'Teste' } });
    await radios[1].click();
    expect(searchValue).toHaveTextContent('');
    expect(searchType).toHaveTextContent('ingredient');
    await submit.click();
    expect(searchValue).toHaveTextContent('Teste');
    expect(searchType).toHaveTextContent('name');
  });
});
