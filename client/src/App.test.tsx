import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import App from './App';


describe('App Component', () => {
  test('renders the app', () => {
    render(
      <Router>
        <App />
      </Router>);
    expect(document.body).toBeInTheDocument();
  });

  test('redirects from "/" to "/login"', () => {
    render(
      <Router initialEntries={['/']}>
        <App />
      </Router>
    );
    const loginHeader = screen.getByRole('heading', { name: /log in/i });
    expect(loginHeader).toBeInTheDocument();
  });

  test('renders login page when navigating to /login', () => {
    render(
      <Router initialEntries={['/login']}>
        <App />
      </Router>
    );
    const loginHeader = screen.getByRole('heading', { name: /log in/i });
    expect(loginHeader).toBeInTheDocument();
  });

  test('renders home page when navigating to /home', () => {
    render(
      <Router initialEntries={['/home']}>
        <App />
      </Router>
    );
    const noBooksMessage = screen.getByText(/no books found/i);
    expect(noBooksMessage).toBeInTheDocument();
  });

  test('renders register page when navigating to /register', () => {
    render(
      <Router initialEntries={['/register']}>
        <App />
      </Router>
    );
    const registerHeader = screen.getByRole('heading', { name: /register/i });
    expect(registerHeader).toBeInTheDocument();
  });

 test('renders profile page when navigating to /profile', () => {
    render(
      <Router initialEntries={['/profile']}>
        <App />
      </Router>
    );
    const profileHeader = screen.getByRole('heading', { name: /profile/i });
    expect(profileHeader).toBeInTheDocument();
  });
});