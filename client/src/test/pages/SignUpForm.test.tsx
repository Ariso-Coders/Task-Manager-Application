import { fireEvent, getByText, render, screen } from "@testing-library/react";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../../pages/SignUp";
import { Button } from "../../components/Button";
// import axios,{AxiosResponse} from "axios";

// jest.mock('axios'); // Mock axios module

test("SignUp component renders without crashing", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
});

test("Button should be rendered", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const buttonEl = screen.getByRole("button", {
    name: "SignUp",
  });
  expect(buttonEl).toBeInTheDocument();
});

test("Email input field should be rendered", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const emailInputEl = screen.getByLabelText("Email");
  expect(emailInputEl).toBeInTheDocument();
});

test("Name input field should be rendered", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const nameInputEl = screen.getByLabelText("Name");
  expect(nameInputEl).toBeInTheDocument();
});

test("DOB input field should be rendered", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const dobInputEl = screen.getByLabelText("DOB");
  expect(dobInputEl).toBeInTheDocument();
});

test("Password input field should be rendered", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const passwordInputEl = screen.getByLabelText("Password");
  expect(passwordInputEl).toBeInTheDocument();
});

test("Confirm Password input field should be rendered", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const confirmPasswordInputEl = screen.getByLabelText("Re-enter password");
  expect(confirmPasswordInputEl).toBeInTheDocument();
});

describe("Error Messages ", () => {
  test("displays when form is submitted without filling input fields", async () => {
    render(
      <Router>
        <SignUp />
      </Router>
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


// describe("SignUp component", () => {
//   test("submit handler is called when the form is submitted", async () => {
//     render(<Router>
//       <SignUp />
//     </Router>);

//     // Mock the axios response
//     (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} } as AxiosResponse);

//     // Simulate user input
//     fireEvent.change(screen.getByLabelText("Email"), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByLabelText("Name"), { target: { value: 'Test User' } });
//     fireEvent.change(screen.getByLabelText("DOB"), { target: { value: '2000-01-01' } });
//     fireEvent.change(screen.getByLabelText("Password"), { target: { value: 'password' } });
//     fireEvent.change(screen.getByLabelText("Re-enter password"), { target: { value: 'password' } });

//     // Submit the form
//     fireEvent.submit(screen.getByText("SignUp"));

//     // Assert that axios.post has been called
//     expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/user/signup", {
//       email: 'test@example.com',
//       name: 'Test User',
//       dob: '2000-01-01',
//       password: 'password',
//       confirmPassword: 'password'
//     });
//   });
// });