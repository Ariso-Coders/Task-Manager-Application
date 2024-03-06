import { render, screen,fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../../pages/LoginForm";
import { Button } from "../../components/Button";
import {LoginFormData} from "../../pages/LoginForm";

test("Render The Login Component without crashing",()=>{
  render(
    <Router>
      <LoginForm/>
    </Router>
  )
})

test("Login Text should be displayed", () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
  const loginText = screen.getByText(/Login/i);
  expect(loginText).toBeInTheDocument();
});

test("email input should be rendered", () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
  const userInputEl = screen.getByPlaceholderText(/Enter Your Email/i);
  expect(userInputEl).toBeInTheDocument;
});

test("password input should be rendered", () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
  const userInputEl = screen.getByPlaceholderText(/password/i);
  expect(userInputEl).toBeInTheDocument;
});

test("Login button should be rendered", () => {
  render(<Button buttonLabel="Login" />); 
  const buttonInput = screen.getByRole("button");
  expect(buttonInput).toBeInTheDocument();
});

//mock function for submit handler
test('Submit handler is are called',()=>{
  const submitHandler=jest.fn();
  const props: LoginFormData = {
    email: 'ashani@gmail.com',
    password: '12345678',
    handleSubmit: submitHandler, 
  };
  
  render(
    <Router>
      <LoginForm {...props}
      handleSubmit={submitHandler}/>
    </Router>
  )
})

//Grouped test for error messages
describe('Error Message Diplayed For',()=>{
  test("'Email Is Required' when email is empty", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    fireEvent.submit(screen.getByText("Login"));
    expect(await screen.findByText("Email Is Required")).toBeInTheDocument();
   
  });

  test("'Password Is Required' when email is empty", async()=>{
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    fireEvent.submit(screen.getByText("Login"));
    expect (await screen.findByText('Password is required')).toBeInTheDocument();
  })
  
})



