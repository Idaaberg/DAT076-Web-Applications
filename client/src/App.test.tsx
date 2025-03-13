import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import App from './App';
import axios from 'axios';


jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders the app', async () => {
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>
      );
    });
    expect(document.body).toBeInTheDocument();
  });

  test('redirects from "/" to "/login"', async () => {
    await act(async () => {
      render(
        <Router initialEntries={['/']}>
          <App />
        </Router>
      );
    });

    const loginHeader = await screen.findByRole('heading', { name: /log in/i });
    expect(loginHeader).toBeInTheDocument();
  });

  test('renders login page when navigating to /login', async () => {
    await act(async () => {
      render(
        <Router initialEntries={['/login']}>
          <App />
        </Router>
      );
    });

    const loginHeader = await screen.findByRole('heading', { name: /log in/i });
    expect(loginHeader).toBeInTheDocument();
  });

  test('renders home page when navigating to /home', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] }); 

    await act(async () => {
      render(
        <Router initialEntries={['/home']}>
          <App />
        </Router>
      );
    });

    const noBooksMessage = await screen.findByText(/no books found/i);
    expect(noBooksMessage).toBeInTheDocument();
  });

  test('renders register page when navigating to /register', async () => {
    await act(async () => {
      render(
        <Router initialEntries={['/register']}>
          <App />
        </Router>
      );
    });

    const registerHeader = await screen.findByRole('heading', { name: /register/i });
    expect(registerHeader).toBeInTheDocument();
  });

  test('renders profile page when navigating to /profile', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { username: 'testuser' } });

    await act(async () => {
      render(
        <Router initialEntries={['/profile']}>
          <App />
        </Router>
      );
    });

    const profileHeader = await screen.findByRole('heading', { name: /profile/i });
    expect(profileHeader).toBeInTheDocument();
  });
});