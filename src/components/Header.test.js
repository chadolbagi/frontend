import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

test("renders operator and caller buttons", () => {
  const { getByText } = render(
    <Router>
      <Header />
    </Router>
  );

  expect(getByText(/operator/i)).toBeInTheDocument();
  expect(getByText(/caller/i)).toBeInTheDocument();
});
