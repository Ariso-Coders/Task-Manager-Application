import {
  render,
  screen,
  fireEvent,
  getByPlaceholderText,
  waitFor,
} from "@testing-library/react";
import React from "react";
import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  createMemoryRouter,
} from "react-router-dom";
import LoginForm from "../../pages/LoginForm";
import { Button } from "../../components/Button";
import user, { userEvent } from "@testing-library/user-event";
import Task from "../../pages/Task";
import { Provider } from "react-redux";
import store from "../../store/index";
import Layout from "../../Layout/Layout";
import axios from "axios";
import SignUp from "../../pages/SignUp";

test("Render The Login Component without crashing", () => {
  render(
    <Provider store={store}>
      <Router>
        <LoginForm />
      </Router>
    </Provider>
  );
});

//rendering components
describe("render", () => {
  test("Login Text should be displayed", () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );
    const loginText = screen.getByText(/Login/i);
    expect(loginText).toBeInTheDocument();
  });

  test("email input should be rendered", () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );
    const userInputEl = screen.getByPlaceholderText(/Enter Your Email/i);
    expect(userInputEl).toBeInTheDocument;
  });

  test("password input should be rendered", () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );
    const userInputEl = screen.getByPlaceholderText(/password/i);
    expect(userInputEl).toBeInTheDocument;
  });

  test("Login button should be rendered", () => {
    render(<Button buttonLabel="Login" />);
    const buttonInput = screen.getByRole("button");
    expect(buttonInput).toBeInTheDocument();
  });
});

//Grouped test for error messages
describe("Error Message Diplayed For", () => {
  test("'Email Is Required' when email is empty", async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );
    fireEvent.submit(screen.getByText("Signin"));
    expect(await screen.findByText("Email Is Required")).toBeInTheDocument();
  });

  test("'Password Is Required' when email is empty", async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );
    const submitButton = screen.getByRole("button", { name: /Signin/i });
    user.click(submitButton);
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });
});

//Validation Test Cases
describe("validation", () => {
  test("Invalid email format", async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/Enter Your Email/i);
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.submit(screen.getByText(/Signin/i));
    const emailErrorMessage = await screen.findByText("Invalid Email");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  test("Password shorter than 8 characters", async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
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

test("navigation", async () => {
  const user = userEvent.setup();
  const routes = [
    {
      path: "/",
      element: (
        <Layout>
          <LoginForm />
        </Layout>
      ),
    },
    {
      path: "/signup",
      element: (
        <Layout>
          <SignUp />
        </Layout>
      ),
    },
    {
      path: "/task",
      element: (
        <Layout>
          <Task />
        </Layout>
      ),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/signup", "/task"],
    initialIndex: 0,
  });
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  //checks if we are on login page
  const loginHeader = screen.getByText(
    "Welcome Back! Please Enter Your details"
  );
  expect(loginHeader).toBeVisible();

  //check for "sign up" link on login page
  const signInLink = screen.getByRole("link", { name: /Sign Up/i });
  expect(signInLink).toBeVisible();
  await user.click(signInLink);
  
  //check sign up page
  await waitFor(() => {
    const aboutUsText = screen.getByText(/Already Have an Account/i);
    expect(aboutUsText).toBeVisible();
  });
});
