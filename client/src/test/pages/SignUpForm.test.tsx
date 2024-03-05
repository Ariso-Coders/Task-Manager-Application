import {render,screen} from '@testing-library/react'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from '../../pages/SignUp';
import { Button } from '../../components/Button';


test('Button should be rendered', () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
   const buttonEl=screen.getByRole("button")
   expect(buttonEl).toBeInTheDocument();
  });


