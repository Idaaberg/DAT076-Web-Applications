import { render, fireEvent, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router';
import Login from '../pages/Login';

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('A Login screen', () => {
  test('when users have registered, they can log in', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { token: "fake-jwt-token" } });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginUsernameField = await screen.findByLabelText("Username");
    const loginPasswordField = await screen.findByLabelText("Password");
    const loginButton = screen.getByRole('button', { name: "Log In" });

    await act(async () => {
      fireEvent.change(loginUsernameField, { target: { value: "JohnDoe" } });
      fireEvent.change(loginPasswordField, { target: { value: "drowssap" } });
      fireEvent.click(loginButton);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8080/user/login',
      { username: 'JohnDoe', password: 'drowssap' }
    );
  });
});
