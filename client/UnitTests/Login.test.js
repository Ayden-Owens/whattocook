import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Login from '../src/Login';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login', () => {
  it('handleLogin function works correctly with valid input', async () => {
    // Mock Axios post method
    jest.spyOn(Axios, 'post').mockResolvedValue({
      data: { message: 'Login successful' },
    });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Username:'), { target: { value: 'testUser' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'testPassword' } });

    // Click the Login button
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      // Assert that Axios.post was called with the correct arguments
      expect(Axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/users/login',
        {
          username: 'testUser',
          password: 'testPassword'
        },
        { withCredentials: true }
      );

      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});
