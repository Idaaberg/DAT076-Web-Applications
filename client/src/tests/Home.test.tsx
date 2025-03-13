import '@testing-library/jest-dom';
import Home from '../pages/Home';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('A Home Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the add button', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });
        
        await act(async () => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );
        });

        const button = await screen.findByRole('button', { name: "Add Book" });
        expect(button).toBeInTheDocument();
    });

    test('renders empty message initially', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );
        });

        const emptyMsg = await screen.findByText("No books found");
        expect(emptyMsg).toBeInTheDocument();
    });

    test('renders the search bar', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );
        });

        const search = await screen.findByPlaceholderText("Search");
        expect(search).toBeInTheDocument();
    });

    test('renders the logo', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );
        });

        const logo = await screen.findByText("BookShelf");
        expect(logo).toBeInTheDocument();
    });

    test('clicking the add button opens the add book form', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );
        });

        const button = await screen.findByRole('button', { name: "Add Book" });
        fireEvent.click(button);

        const form = await screen.findByText("Add Book");
        expect(form).toBeInTheDocument();
    });

    test('writing in the search bar updates the search value', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );
        });

        const search = await screen.findByPlaceholderText("Search");
        fireEvent.change(search, { target: { value: "test" } });

        expect(search).toHaveValue("test");
    });

    test('selecting a filter updates the filter value', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

        await act(async () => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );
        });

        const select = await screen.findByTestId('filterBtn');
        fireEvent.change(select, { target: { value: "author" } });

        expect(select).toHaveValue("author");
    });
});