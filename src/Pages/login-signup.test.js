import { render, screen } from "@testing-library/react";
import Register from "./Register";

describe("signup UI", () => {
  test("email input", () => {
    render(<Register />);
    const nameElement = screen.getByText('Email')
    expect(nameElement).toBeInTheDocument()
  });
  test("password input", () => {
    render(<Register />);
    const passwordElement = screen.getByText('Password')
    expect(passwordElement).toBeInTheDocument()
  });
  test("confirm password input", () => {
    render(<Register />);
    const confirmPasswordElement = screen.getByText('Confirm Password')
    expect(confirmPasswordElement).toBeInTheDocument()
  });
});
