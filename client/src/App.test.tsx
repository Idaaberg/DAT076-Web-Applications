import '@testing-library/jest-dom';
import Home from './pages/Home';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';



describe('Home Component', () => {
  test('renders the add button', () => {
    render(
      <MemoryRouter >
        <Home />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: "Add Book" });
    expect(button).toBeInTheDocument();
  });

  test('renders empty message initially', () => {
    render(
      <MemoryRouter >
        <Home />
      </MemoryRouter>
    );   
     
    const emptyMsg = screen.getByText("No books found");
    expect(emptyMsg).toBeInTheDocument();
  });

  test('renders the search bar', () => {
    render(
      <MemoryRouter >
        <Home />
      </MemoryRouter>
    );

    const search = screen.getByPlaceholderText("Search");
    expect(search).toBeInTheDocument();
  });

  test('render the logo', () => {
    render(
      <MemoryRouter >
        <Home />
      </MemoryRouter>
    );

    const logo = screen.getByText("BookShelf");
    expect(logo).toBeInTheDocument();
  });
});