import { act, fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../../pages/SignUp";
import { Button } from "../../components/Button";
import { FormData } from "../../pages/SignUp";
import user from "@testing-library/user-event";


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

// test("Validates email input field", async () => {
//   render(
//     <Router>
//       <SignUp />
//     </Router>
//   );
//   fireEvent.change(screen.getByLabelText("Email"),
   
//    {target: { value: "invalid_email" },
//   });

//   expect(await screen.findByText(/Invalid Email/)).toBeInTheDocument();
// });

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



test("Navigate to task page", async() => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
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

    const submitButton = screen.getByRole("button", { name: /SignUp/i });
    user.click(submitButton); 
    await waitFor(() => expect(window.location.pathname).toBe("/"));

  })