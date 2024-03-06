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


