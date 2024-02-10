import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../src/Contact';


global.fetch = jest.fn().mockResolvedValue({});

// Mock the useNavigate hook
// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
// }));

describe('Contact', () => {
  it('handleContact function works correctly with valid input', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Name:'), { target: { value: 'testUser' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'testEmail' } });
    fireEvent.change(getByLabelText('Subject:'), { target: { value: 'testSubject' } });
    fireEvent.change(getByLabelText('Message:'), { target: { value: 'testText' } });

    // Click the Contact button
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      // Assert that Axios.post was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/contactus',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            name: 'testUser',
            email: 'testEmail',
            subject: 'testSubject',
            text: 'testText',
          }),
        }
      );

      // Assert navigation
      //expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});
