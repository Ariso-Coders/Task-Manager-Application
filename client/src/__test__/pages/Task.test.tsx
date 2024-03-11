import { render } from "@testing-library/react";
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