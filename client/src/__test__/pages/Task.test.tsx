import { render,screen,fireEvent } from "@testing-library/react";
import React from "react";
import Task from "../../pages/Task";
import { Provider } from "react-redux";
import store from "../../store/index";

test("Render The Task page without crashing", () => {
  render(
    <Provider store={store}>
      <Task />
    </Provider>
  );
});


describe("Task component", () => {
  test("renders Task component", () => {
    render(<Task />);
    expect(screen.getByText(/you have/i)).toBeInTheDocument();
  });

  test("displays error card when delete button is clicked", () => {
    render(<Task />);
    fireEvent.click(screen.getByRole('button',{name:'AI'})); 
    expect(screen.getByText(/Do you want to Delete this task ?/i)).toBeInTheDocument();
  });

  test("updates search term state when user types in search input", () => {
    render(<Task />);
    fireEvent.change(screen.getByPlaceholderText("Search For Task"), { target: { value: "example" } });
    expect(screen.getByPlaceholderText("Search For Task")).toHaveValue("example");
  });

  test("toggles filter menu when filter icon is clicked", () => {
    render(<Task />);
    fireEvent.click(screen.getByRole("button", { name: /filters/i }));
    expect(screen.getByText(/Filter by:/i)).toBeInTheDocument();
  });
});
