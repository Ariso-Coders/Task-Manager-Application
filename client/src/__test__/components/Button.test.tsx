import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Button } from "../../components/Button";


test("Login button should be rendered", () => {
    render(<Button buttonLabel="Login" />); 
    const buttonInput = screen.getByRole("button");
    expect(buttonInput).toBeInTheDocument();
  });
  