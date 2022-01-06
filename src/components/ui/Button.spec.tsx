import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("button", () => {
  it("renders a button", () => {
    const clicked = jest.fn();
    render(<Button onClick={clicked}></Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  
  it("should fire clicks", () => {
    const clicked = jest.fn();
    render(<Button onClick={clicked}></Button>);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(clicked).toBeCalled();
  });
});
