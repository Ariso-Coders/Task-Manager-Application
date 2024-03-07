import {
  render,
  screen,
  fireEvent,
  getByPlaceholderText,
  waitFor
} from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../../pages/LoginForm";
import { Button } from "../../components/Button";
import { LoginFormData } from "../../pages/LoginForm";
import user from "@testing-library/user-event";
import userEvent from "@testing-library/react";

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
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });
});

test("when valid input is submitted", async () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );
  const emailInput = screen.getByPlaceholderText(/Enter your email/i);

  fireEvent.change(emailInput, { target: { value: "ashani@gmail.com" } });
  const passwordInput = screen.getByPlaceholderText(/enter your password/i);
  fireEvent.change(passwordInput, { target: { value: "12345678" } });
  fireEvent.submit(screen.getByText(/Login/i));
  const errorMessage = screen.queryByText(/Email is required/i);
  expect(errorMessage).toBeNull();
});

// test("when invalid input is submitted", async () => {
//   render(
//     <Router>
//       <LoginForm />
//     </Router>
//   );
//   const emailInput = screen.getByPlaceholderText(/Enter your email/i);

//   fireEvent.change(emailInput, { target: { value: "invalid@gmail.com" } });
//   const passwordInput = screen.getByPlaceholderText(/enter your password/i);
//   fireEvent.change(passwordInput, { target: { value: "123456789" } });
//   fireEvent.submit(screen.getByText(/Login/i));
 

//   const errorMessage = await screen.findByText("This email is not registered or Invalid Password");
//   expect(errorMessage).toBeInTheDocument();


// });

//Validation Test Cases
test("Invalid email format", async () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText(/Enter Your Email/i);
  fireEvent.change(emailInput, { target: { value: "invalidemail" } });
  fireEvent.submit(screen.getByText(/Login/i));
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
  fireEvent.submit(screen.getByText(/Login/i));
  const passwordErrorMessage = await screen.findByText("Password Should Be At Least 8 Characters");
  expect(passwordErrorMessage).toBeInTheDocument();
});