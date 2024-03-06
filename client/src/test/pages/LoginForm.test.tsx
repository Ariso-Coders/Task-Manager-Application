import {
  render,
  screen,
  fireEvent,
  getByPlaceholderText,
} from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../../pages/LoginForm";
import { Button } from "../../components/Button";
import { LoginFormData } from "../../pages/LoginForm";
import user from "@testing-library/user-event";
import userEvent from "@testing-library/react";
import { input } from "@testing-library/user-event/dist/types/event";

test("Render The Login Component without crashing", () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
});

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

//submithandler tests
//1.render submit handler
test("Submit handler is rendered", async () => {
  const submitHandler = jest.fn();
  const props: LoginFormData = {
    handleSubmit: submitHandler,
  };

  render(
    <Router>
      <LoginForm {...props} handleSubmit={submitHandler} />
      <Button buttonLabel="Login" />
    </Router>
  );
});




//Grouped test for error messages
describe("Error Message Diplayed For", () => {
  test("'Email Is Required' when email is empty", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    fireEvent.submit(screen.getByText("Login"));
    expect(await screen.findByText(/Email Is Required/i)).toBeInTheDocument();
  });

  test("'Password Is Required' when email is empty", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    fireEvent.submit(screen.getByText("Login"));
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });
});

test("Submit button with empty email displays error message", async () => {
  const submitHandler = jest.fn(); 
  render(
    <Router>
      <LoginForm handleSubmit={submitHandler} />
    </Router>
  );
  const form = screen.getByRole("form");
  const emailInput = screen.getByPlaceholderText(/enter your email/i);
  fireEvent.change(emailInput, { target: { value: "" } });
  fireEvent.submit(form);

  expect(await screen.findByText(/Email Is Required/i)).toBeInTheDocument();
});

test("Submit button with empty password displays error message", async () => {
  const submitHandler = jest.fn(); 
  render(
    <Router>
      <LoginForm handleSubmit={submitHandler} />
    </Router>
  );
  const form = screen.getByRole("form");
  const passwordInput = screen.getByPlaceholderText(/enter your password/i);
  fireEvent.change(passwordInput, { target: { value: "" } });
  fireEvent.submit(form);

  expect(await screen.findByText(/email Is Required/i)).toBeInTheDocument();
});