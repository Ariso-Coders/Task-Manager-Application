import {
  render,
  screen,
  fireEvent,
  getByPlaceholderText,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../../pages/LoginForm";
import { Button } from "../../components/Button";
import user from "@testing-library/user-event";
import userEvent from "@testing-library/react";
test("Render The Login Component without crashing", () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
});
//rendering components
describe("render", () => {
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
});
//Grouped test for error messages
describe("Error Message Diplayed For", () => {
  test("'Email Is Required' when email is empty", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    fireEvent.submit(screen.getByText("Signin"));
    expect(await screen.findByText("Email Is Required")).toBeInTheDocument();
  });
  test("'Password Is Required' when email is empty", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    const submitButton = screen.getByRole("button", { name: /Signin/i });
    user.click(submitButton);
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });
});
//Upon entry of valid input data
describe("Valid Data Submit", () => {
  test("No Error Message is Displayed", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(emailInput, { target: { value: "ashani@gmail.com" } });
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    const submitButton = screen.getByRole("button", { name: /Signin/i });
    user.click(submitButton);
    const errorMessage = screen.queryByText(/Email is required/i);
    expect(errorMessage).toBeNull();
  });
  test("Navigate to task page", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText(/Enter Your Email/i);
    fireEvent.change(emailInput, { target: { value: "ashani@gmail.com" } });
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    const submitButton = screen.getByRole("button", { name: /Signin/i });
    user.click(submitButton);
    waitFor(() => expect(window.location.pathname).toEqual("/task"));
  });
});

  test("Error when submit invalid data", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText(/Enter Your Email/i);
    fireEvent.change(emailInput, { target: { value: "aaashani@gmail.com" } });
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    fireEvent.change(passwordInput, { target: { value: "1234567890" } });
    const submitButton = screen.getByRole("button", { name: /Signin/i });
    user.click(submitButton);
    waitFor(() =>
    expect(screen.getByText("This email is not registered or Invalid Password")).toBeVisible()
  );
  });

//Validation Test Cases
describe("validation", () => {
  test("Invalid email format", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText(/Enter Your Email/i);
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.submit(screen.getByText(/Signin/i));
    const emailErrorMessage = await screen.findByText("Invalid Email");
    expect(emailErrorMessage).toBeInTheDocument();
  });
  test("Password shorter than 8 characters", async () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.submit(screen.getByText(/Signin/i));
    const passwordErrorMessage = await screen.findByText(
      "Password Should Be At Least 8 Characters"
    );
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});
