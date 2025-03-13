import { render, fireEvent, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router';
import Register from '../pages/Register';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('A register screen', () => {
  test('when Register is clicked, sends the username and password to the server', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { exists: false } });

    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'success' } });

    await act(async () => {
      render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
    });

    const userNameField = await screen.findByLabelText("Username");
    const passwordField = await screen.findByLabelText("Password");
    const registerButton = screen.getByRole('button', { name: "Register" });

    await act(async () => {
      fireEvent.change(await userNameField, { target: { value: "JohnDoe" } });
      fireEvent.change(await passwordField, { target: { value: "drowssap" } });
      fireEvent.click(registerButton);
    });

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8080/user/exists?username=JohnDoe');
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8080/user', { username: 'JohnDoe', password: 'drowssap' });
  });
});