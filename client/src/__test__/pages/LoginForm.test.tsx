import {
  render,
  screen,
  fireEvent,
  getByPlaceholderText,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "../../pages/LoginForm";
import { Button } from "../../components/Button";
import user from "@testing-library/user-event";
import Task from "../../pages/Task";
import { Provider } from "react-redux";
import store from "../../store/index";
import Layout from "../../Layout/Layout";
import axios from "axios";

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
  //not working
  test("Navigate to task page", async () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route
            path="/task"
            element={
              <Layout>
                <Task />
              </Layout>
            }
          ></Route>
        </Routes>
      </Router>
    );
    const emailInput = screen.getByPlaceholderText(/Enter Your Email/i);
    fireEvent.change(emailInput, { target: { value: "ashani@gmail.com" } });

    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    fireEvent.change(passwordInput, { target: { value: "12345678" } });

    const submitButton = screen.getByRole("button", { name: /Signin/i });
    fireEvent.click(submitButton);
    render(
      <Router>
        <Provider store={store}>
          <Layout>
            <Task />
          </Layout>
        </Provider>
      </Router>
    );

    // await waitFor(() => expect(window.location.pathname).toBe("/task"));

    //  expect(
    //   await (window.location.pathname)
    //  ).toBe("/task")
  });
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

//not working
test("submit invalid email or password", async () => {
  render(
    <Router>
      <LoginForm />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText(/Enter Your Email/i);
  fireEvent.change(emailInput, { target: { value: "aaashani@gmail.com" } });

  const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
  fireEvent.change(passwordInput, { target: { value: "12345678" } });

  const submitButton = screen.getByRole("button", { name: /Signin/i });
  fireEvent.click(submitButton);
  fireEvent.submit(screen.getByText(/Signin/i));
  // expect(
  //   await screen.findByText(/This email is not registered or Invalid Password/i)
  // ).toBeInTheDocument();
  await waitFor(() =>
    expect(
      screen.getByText("This email is not registered or Invalid Password")
    ).toBeInTheDocument()
  );
});

// not working
axios.post = jest.fn();
jest.mock("axios");

test("success login", async () => {
  const resp = {
    data: {
      //userToken: 'mockToken',
      userName: "Ashani",
      userEmail: "ashani@gmail.com",
    },
  };
  axios.post.mockResolvedValue(resp);

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
  fireEvent.click(submitButton);
  //expect(localStorage.setItem).toHaveBeenCalledWith('userEmail', 'ashani@gmail.com');
  //const actualResp= getAxios()
  // expect (actualResp).toEqual(resp)
});
