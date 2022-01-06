import { render, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import GameInformation from "./GameInformation";

async function renderComponent() {
  return await waitFor(() =>
    render(
      <Provider store={store}>
        <GameInformation />
      </Provider>
    )
  );
}

describe("game information", () => {
  it("should have a label", async () => {
    await renderComponent();
    const label = screen.getByText("Game Information:");
    expect(label).toBeInTheDocument();
  });

  it("should display the time remaining at 0 seconds", async () => {
    await renderComponent();
    const label = screen.getByText("Time Remaining:");
    expect(label).toBeInTheDocument();
    const timeRemaining = screen.getByText("0");
    expect(timeRemaining).toBeInTheDocument();
  });

  it("should display the rounds at 0", async () => {
    await renderComponent();
    const label = screen.getByText("Rounds:");
    expect(label).toBeInTheDocument();
    const rounds = screen.getByText(`0/undefined`);
    expect(rounds).toBeInTheDocument();
  });

  it("should display None as the previous song initially", async () => {
    await renderComponent();
    const label = screen.getByText("Previous song:");
    expect(label).toBeInTheDocument();
    const previousSong = screen.getByText("None");
    expect(previousSong).toBeInTheDocument();
  });
});
