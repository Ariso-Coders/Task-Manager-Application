import { act, fireEvent, getByText, render, screen } from "@testing-library/react";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../../pages/SignUp";
import { Button } from "../../components/Button";
import { FormData } from "../../pages/SignUp";
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
//submithandler tests
test("Submit handler is rendered", async () => {
  const submitHandler = jest.fn();
  const props: FormData = {
    handleSubmit: submitHandler,
  };
  render(
    <Router>
      <SignUp {...props} handleSubmit={submitHandler} />
      <Button buttonLabel="SignUp" />
    </Router>
  );
});
test("when valid input is submitted", async () => {
  render(
    <Router>
      <SignUp />
    </Router>
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
      <Router>
        <SignUp />
      </Router>
    );
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.submit(screen.getByText(/SignUp/i));
    const emailErrorMessage = await screen.findByText("Invalid Email");
    expect(emailErrorMessage).toBeInTheDocument();
  });
  test("Name is required message", async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.submit(screen.getByText(/SignUp/i));
    const nameErrorMessage = await screen.findByText("Name is required");
    expect(nameErrorMessage).toBeInTheDocument();
  });
  test("Name is required message", async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const dobInput = screen.getByLabelText(/DOB/i);
    fireEvent.change(dobInput, { target: { value: "" } });
    fireEvent.submit(screen.getByText(/SignUp/i));
    const dobErrorMessage = await screen.findByText("DOB is required");
    expect(dobErrorMessage).toBeInTheDocument();
  });
  test("Password shorter than 8 characters", async () => {
    render(
      <Router>
        <SignUp />
      </Router>
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
      <Router>
        <SignUp />
      </Router>
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



