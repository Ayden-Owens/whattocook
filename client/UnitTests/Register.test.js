import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Register from '../src/Register';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Register', () => {
  it('handleRegistration function works correctly with valid input', async () => {
    // Mock Axios post method
    jest.spyOn(Axios, 'post').mockResolvedValue({
      data: { message: 'Registration successful' },
    });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'testPassword' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });

    // Click the Register button
    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      // Assert that Axios.post was called with the correct arguments
      expect(Axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/users/register',
        {
          username: 'testUser',
          password: 'testPassword',
          email: 'test@example.com',
        },
        { withCredentials: true }
      );

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
