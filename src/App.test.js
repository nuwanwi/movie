import React from "react";
import { render } from "@testing-library/react";
import Header from "./components/pageHeader";

test("renders learn react link", () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText("Movies");
});
