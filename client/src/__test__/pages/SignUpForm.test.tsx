import { act, fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // For illustration, assuming you're using react-router-dom for testing
import SignUp from "../../pages/SignUp";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, useLocation, MemoryRouter,RouterProvider } from 'react-router-dom'; // For testing purposes
import LoginForm from "../../pages/LoginForm";
import Layout from '../../Layout/Layout';
import Task from '../../pages/Task';
import User from '../../pages/User';
import { Provider } from "react-redux";
import { setupStore } from "../../store";
//import store from '../../store/index'
const store = setupStore();
test("SignUp component renders without crashing", () => {
  render(
    <Provider store={store}>
    <Router>
      <SignUp />
    </Router>
  </Provider>
  );
});
test("Button should be rendered", () => {
  render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );
  const buttonEl = screen.getByRole("button", {
    name: "SignUp",
  });
  expect(buttonEl).toBeInTheDocument();
});
test("Email input field should be rendered", () => {
  render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );
  const emailInputEl = screen.getByLabelText("Email");
  expect(emailInputEl).toBeInTheDocument();
});
test("Name input field should be rendered", () => {
  render(
    <Provider store={store}>
    <Router>
      <SignUp />
    </Router>
  </Provider>
  );
  const nameInputEl = screen.getByLabelText("Name");
  expect(nameInputEl).toBeInTheDocument();
});
test("DOB input field should be rendered", () => {
  render(
    <Provider store={store}>
    <Router>
      <SignUp />
    </Router>
  </Provider>
  );
  const dobInputEl = screen.getByLabelText("DOB");
  expect(dobInputEl).toBeInTheDocument();
});
test("Password input field should be rendered", () => {
  render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );
  const passwordInputEl = screen.getByLabelText("Password");
  expect(passwordInputEl).toBeInTheDocument();
});
test("Confirm Password input field should be rendered", () => {
  render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );
  const confirmPasswordInputEl = screen.getByLabelText("Re-enter password");
  expect(confirmPasswordInputEl).toBeInTheDocument();
});
describe("Error Messages ", () => {
  test("displays when form is submitted without filling input fields", async () => {
    render(
      <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
    );
    fireEvent.submit(screen.getByText("SignUp"));
    expect(await screen.findByText("Email Is Required")).toBeInTheDocument();
    fireEvent.submit(screen.getByText("SignUp"));
    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    fireEvent.submit(screen.getByText("SignUp"));
    expect(await screen.findByText("DOB is required")).toBeInTheDocument();
    fireEvent.submit(screen.getByText("SignUp"));
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    fireEvent.submit(screen.getByText("SignUp"));
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });
});

test("when valid input is submitted", async () => {
  render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );
  await act(async () => {
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "ashani@gmail.com" } });
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "aashani" } });
    const birthInput = screen.getByLabelText(/DOB/i);
    fireEvent.change(birthInput, { target: { value: '07/02/2000' } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    const confirmPasswordInput = screen.getByLabelText(/Re-enter password/i);
    fireEvent.change(confirmPasswordInput, { target: { value: "12345678" } });
    fireEvent.submit(screen.getByText("SignUp"));
  });
  const errorMessage = screen.queryByText(/Email is required/i);
  expect(errorMessage).toBeNull();
});
//Validation Test Cases
describe("validation", () => {
  test("Invalid email format", async () => {
    render(
      <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
    );
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.submit(screen.getByText(/SignUp/i));
    const emailErrorMessage = await screen.findByText("Invalid Email");
    expect(emailErrorMessage).toBeInTheDocument();
  });
  test("Name is required message", async () => {
    render(
      <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
    );
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.submit(screen.getByText(/SignUp/i));
    const nameErrorMessage = await screen.findByText("Name is required");
    expect(nameErrorMessage).toBeInTheDocument();
  });
  test("Name is required message", async () => {
    render(
      <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
    );
    const dobInput = screen.getByLabelText(/DOB/i);
    fireEvent.change(dobInput, { target: { value: "" } });
    fireEvent.submit(screen.getByText(/SignUp/i));
    const dobErrorMessage = await screen.findByText("DOB is required");
    expect(dobErrorMessage).toBeInTheDocument();
  });
  test("Password shorter than 8 characters", async () => {
    render(
      <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
    );
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.submit(screen.getByText(/SignUp/i));
    const passwordErrorMessage = await screen.findByText(
      "Password Should Be At Least 8 Characters"
    );
    expect(passwordErrorMessage).toBeInTheDocument();
  });
  test("Password shorter than 8 characters", async () => {
    render(
      <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
    );
  const confirmPasswordInput = screen.getByLabelText("Re-enter password");
    fireEvent.change(confirmPasswordInput, { target: { value: "123" } });
    fireEvent.submit(screen.getByText(/SignUp/i));
    const confirmPasswordErrorMessage = await screen.findByText(
      "Re-enter Password Should Be At Least 8 Characters"
    );
    expect(confirmPasswordErrorMessage).toBeInTheDocument();
  });
});

test("navigate correctly to /login url", async () => {
  const user = userEvent.setup();

  const routes = [
    {
      path: "/",
      element: <Layout  > <LoginForm />  </Layout>,

    },
    {
      path: "/signup",
      element: <Layout  > <SignUp />  </Layout>,

    }
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/signup"],
    initialIndex: 1,
  });


  render(

    <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  );

  const aboutUsText = screen.getByText(/Already Have an Account?/i);
    expect(aboutUsText).toBeVisible();

  const userLink = screen.getByRole("link", { name: /Login/i })
  expect(userLink).toBeVisible();

  await user.click(userLink);

  await waitFor(() => {
    const loginTitle = screen.getByRole('heading', { name: /Login/i });
    expect(loginTitle).toBeVisible();
  });


})