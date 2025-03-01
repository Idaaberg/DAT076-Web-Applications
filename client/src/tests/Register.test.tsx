import { render, fireEvent, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import axios from 'axios'
import { MemoryRouter } from 'react-router';
import Register from '../pages/Register';

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('A register screen', () => {
  test('when Register is clicked, sends the username and password to the server', async () => {
    render(
      <MemoryRouter >
        <Register />
      </MemoryRouter>
  );

    const userNameField = screen.findByLabelText("Username");
    const passwordField = screen.findByLabelText("Password");
    const registerButton = screen.getByRole('button', {name: "Register"});

    await act(async () => {
      fireEvent.change(await userNameField, {target: {value: "JohnDoe"}});
      fireEvent.change(await passwordField, {target: {value: "drowssap"}});
      fireEvent.click(registerButton);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8080/user',
      { username : 'JohnDoe', password: 'drowssap' }
    );
  })
});
