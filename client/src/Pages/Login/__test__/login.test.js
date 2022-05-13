import { render, screen } from "@testing-library/react";
import GoogleIcon from "../GoogleIcon";
import Login from "../Login";

test("GoogleIcon renders correctly", () => {
  render(<GoogleIcon />);
  const icon = screen.getByTestId("google-icon");
  expect(icon).toBeInTheDocument();
});

test("Test Sign In", () => {
  render(<Login />);
  const signIn = screen.getByTestId(/Sign In With Google/i);
  expect(signIn).toBeInTheDocument();
});
