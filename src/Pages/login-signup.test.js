import { render, screen } from "@testing-library/react";
import Register from "./Register";
import Login from "./Login";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("signup UI", () => {
  test("email input", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    const nameElement = screen.getByText("Email");
    expect(nameElement).toBeInTheDocument();
  });
  test("password input", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    const passwordElement = screen.getByText("Password");
    expect(passwordElement).toBeInTheDocument();
  });
  test("confirm password input", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    const confirmPasswordElement = screen.getByText("Confirm Password");
    expect(confirmPasswordElement).toBeInTheDocument();
  });
});
describe("Login UI", () => {
  test("email input", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const nameElement = screen.getByText("Email");
    expect(nameElement).toBeInTheDocument();
  });
  test("password input", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const passwordElement = screen.getByText("Password");
    expect(passwordElement).toBeInTheDocument();
  });
  test("logIn button", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  test("register anchor", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toBeInTheDocument();
  });
  test("LogIn header", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const header = screen.getByText("Log In");
    expect(header).toBeInTheDocument();
  });
});
