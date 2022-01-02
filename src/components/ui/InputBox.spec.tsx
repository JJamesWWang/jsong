import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputBox from "./InputBox";

describe("input box", () => {
  it("appears with the provided name", () => {
    render(<InputBox name="in" />);
    const inputBox = screen.getByRole("textbox");
    expect(inputBox).toBeInTheDocument();
    expect(inputBox).toHaveProperty("name", "in");
  });

  it("accepts text", () => {
    render(<InputBox name="in" />);
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "hello");
    expect(inputBox).toHaveValue("hello");
  });

  it("appears with the provided label", () => {
    render(<InputBox name="in" label="In" />);
    const label = screen.getByText("In");
    expect(label).toBeInTheDocument();
    expect(label).toHaveProperty("htmlFor", "in");
  });

  it("appears with the provided size", () => {
    render(<InputBox name="in" size={12} />);
    const inputBox = screen.getByRole("textbox");
    expect(inputBox).toHaveProperty("size", 12);
  });

  it("submits the form", () => {
    const submitted = jest.fn();
    render(<InputBox name="in" onSubmit={submitted} />);
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "hello");
    fireEvent.submit(screen.getByRole("form"));
    expect(submitted).toBeCalled();
  });

  it("validates the text", () => {
    const submitted = jest.fn();
    render(
      <InputBox
        name="in"
        validator={(value) => value.length > 0}
        onSubmit={submitted}
      />
    );
    const inputBox = screen.getByRole("textbox");
    expect(inputBox).toHaveProperty("value", "");
    fireEvent.submit(screen.getByRole("form"));
    expect(submitted).toBeCalledTimes(0);
  });

  it("doesn't start with an error", () => {
    render(
      <InputBox name="in" validator={(value) => value.length > 0} error="error" />
    );
    const error = screen.queryByText("error");
    expect(error).toBeNull();
  });

  it("appears with the provided error", () => {
    render(
      <InputBox name="in" validator={(value) => value.length > 0} error="error" />
    );
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "hello");
    userEvent.clear(inputBox);
    const error = screen.getByText("error");
    expect(error).toBeInTheDocument();
  });
});
