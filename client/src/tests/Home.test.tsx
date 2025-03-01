import '@testing-library/jest-dom';
import Home from '../pages/Home';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


describe('A Home Component', () => {
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

    test('clicking the add button opens the add book form', () => {
        render(
            <MemoryRouter >
                <Home />
            </MemoryRouter>
        );

        const button = screen.getByRole('button', { name: "Add Book" });
        fireEvent.click(button);

        const form = screen.getByText("Add Book");
        expect(form).toBeInTheDocument();
    });

    test('writing in the search bar updates the search value', () => {
        render(
            <MemoryRouter >
                <Home />
            </MemoryRouter>
        );
        const search = screen.getByPlaceholderText("Search");
        fireEvent.change(search, { target: { value: "test" } });
        expect(search).toHaveValue("test");
        expect(search).not.toHaveValue("test2");
    });

    test('selecting a filter updates the filter value', () => {
        render(
            <MemoryRouter >
                <Home />
            </MemoryRouter>
        );

        const select = screen.getByTestId('filterBtn');
        fireEvent.change(select, { target: { value: "author" } });
        expect(select).toHaveValue("author");
        expect(select).not.toHaveValue("rating");
        expect(select).not.toHaveValue("state");
        expect(select).not.toHaveValue("title");
    });
});