import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../helper/renderWithRouter';

const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));
describe('show title', () => {
  it('show title', async () => {
    renderWithRouter(<App />, { route: '/meals/52885/in-progress' });
    await delay(3000);
    expect(screen.getByText('Bubble & Squeak')).toBeInTheDocument();
  });
  it('click and save de ingrendients', async () => {
    renderWithRouter(<App />, { route: '/meals/52885/in-progress' });
    await delay(3000);
    const ingrendients = screen.getByTestId('0-ingredient-step');
    expect(ingrendients).toBeInTheDocument();
    const checkbox = screen.getAllByRole('checkbox');
    expect(checkbox[0]).toBeInTheDocument();
    expect(checkbox[0]).not.toBeChecked();
    const button = screen.getByTestId('finish-recipe-btn');
    expect(button).not.toBeVisible();
    await Promise.all(checkbox.map((check) => userEvent.click(check)));
    expect(button).toBeVisible();
    expect(checkbox[0]).toBeChecked();
    await userEvent.click(button);
  });
});
