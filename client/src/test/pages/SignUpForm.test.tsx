import { fireEvent, getByText, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../../pages/SignUp";
import { Button } from "../../components/Button";

test("SignUp component renders without crashing", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
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

test("Button should be rendered", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("Title should be rendered", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const customElement = screen.getByTestId("custom-element");
  expect(customElement).toBeInTheDocument();
});

test("displays error message for 'Email Is Required' when form is submitted without filling email field", async () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  fireEvent.submit(screen.getByText("SignUp"));
  expect(await screen.findByText("Email Is Required")).toBeInTheDocument();
});

test("displays error message for 'Name is required' when form is submitted without filling name field", async () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  fireEvent.submit(screen.getByText("SignUp"));
  expect(await screen.findByText("Name is required")).toBeInTheDocument();
});


