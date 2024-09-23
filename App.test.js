import React from "react";
import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
//import server from "../../backend/mock-server";
import AppFunctional from "./AppFunctional.js";

// Write your tests here
describe("AppFunctional Component", () => {
  test("renders the coordinates heading on the screen", () => {
    render(<AppFunctional />);
    const coordinatesHeading = screen.getByText(/Coordinates \(2, 2\)/);
    expect(coordinatesHeading).toBeInTheDocument();
  });
  test("renders the steps heading on the screen", () => {
    render(<AppFunctional />);
    const stepsHeading = screen.getByText("You moved 0 times");
    expect(stepsHeading).toBeInTheDocument();
  });
  test("renders the movement buttons", () => {
    render(<AppFunctional />);
    const leftButton = screen.getByText("LEFT");
    const upButton = screen.getByText("UP");
    const rightButton = screen.getByText("RIGHT");
    const downButton = screen.getByText("DOWN");
    expect(leftButton).toBeInTheDocument();
    expect(upButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
  });
  test("renders the reset button on the screen", () => {
    render(<AppFunctional />);
    const resetButton = screen.getByText("reset");
    expect(resetButton).toBeInTheDocument();
  });
});
