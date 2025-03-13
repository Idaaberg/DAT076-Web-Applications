import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../pages/Profile';
import { act, render, screen } from '@testing-library/react';


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Profile page', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({
            data: { username: "testuser" }
        });
    });
    test('renders the logged-in user\'s username', async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Profile />
                </MemoryRouter>
            );
        });

        const usernameElement = await screen.findByText(/testuser/i);
        expect(usernameElement).toBeInTheDocument();
    });

    test('renders the log out button', async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Profile />
                </MemoryRouter>
            );
        });

        const button = screen.getByRole('button', { name: "Log Out" });
        expect(button).toBeInTheDocument();
    });
});
