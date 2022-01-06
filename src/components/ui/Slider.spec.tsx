import { fireEvent, render, screen } from "@testing-library/react";
import Slider from "./Slider";

describe("slider", () => {
  it("appears with the provided name", () => {
    render(<Slider name="in" onChange={() => {}} />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveProperty("name", "in");
  });

  it("appears with the provided label", () => {
    render(<Slider name="in" label="In" onChange={() => {}} />);
    const label = screen.getByText("In");
    expect(label).toBeInTheDocument();
    expect(label).toHaveProperty("htmlFor", "in");
  });

  it("fires onChange", () => {
    const onChange = jest.fn();
    render(<Slider name="in" onChange={onChange} />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "1" } });
    expect(onChange).toBeCalled();
  });
});
