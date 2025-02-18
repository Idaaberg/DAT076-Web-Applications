import '@testing-library/jest-dom';
import Home from './pages/home';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';


describe('Home Component', () => {
  test('renders the add button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: "Add Book" });
    expect(button).toBeInTheDocument();
  });
});