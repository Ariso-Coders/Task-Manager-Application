import {render,screen} from '@testing-library/react'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../../pages/LoginForm'


test('password input should be rendered', () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
    const userInputEl = screen.getByPlaceholderText(/Enter Your Email/i);
    expect(userInputEl).toBeInTheDocument;
  });

  test('email input should be rendered', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
      const userInputEl = screen.getByPlaceholderText(/Enter Your Email/i);
      expect(userInputEl).toBeInTheDocument;
    });

