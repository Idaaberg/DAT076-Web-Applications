import '@testing-library/jest-dom';
import Home from './pages/home';
import { render, screen } from '@testing-library/react';


describe('Home Component', () => {
  test('renders the add button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: "Add Book" });
    expect(button).toBeInTheDocument();
  });

  test('renders empty message initially', () => {
    render(<Home />);
    const emptyMsg = screen.getByText("No books available");
    expect(emptyMsg).toBeInTheDocument();
  });
});