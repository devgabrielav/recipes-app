import { fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar/SearchBar';
import { renderWithRouter } from '../helper/renderWithRouter';

const searchInputTestId = 'search-input';
const ingredientSearchRadioTestId = 'ingredient-search-radio';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterSearchRadioTestId = 'first-letter-search-radio';
const execSearchButtonTestId = 'exec-search-btn';

describe('Testa SearchBar component', () => {
  it('Deve renderizar os elementos corretamente', () => {
    renderWithRouter(<SearchBar />);

    expect(screen.getByTestId(searchInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientSearchRadioTestId)).toBeInTheDocument();
    expect(screen.getByTestId(nameSearchRadioTestId)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetterSearchRadioTestId)).toBeInTheDocument();
    expect(screen.getByTestId(execSearchButtonTestId)).toBeInTheDocument();
  });
});

it('Deve ser possível digitar no campo de pesquisa', () => {
  renderWithRouter(<SearchBar />);

  const searchInput = screen.getByTestId(searchInputTestId);
  fireEvent.change(searchInput, { target: { value: 'Egg' } });

  expect(searchInput).toHaveValue('Egg');
});
