import { screen, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Chat from "./Chat";

window.HTMLElement.prototype.scrollIntoView = function () {};

async function renderComponent() {
  return await waitFor(() =>
    render(
      <Provider store={store}>
        <Chat />
      </Provider>
    )
  );
}

describe("chat", () => {
  it("renders a message box and input box", async () => {
    const { container } = await renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("has a chat label", async () => {
    await renderComponent();
    const chatText = screen.getByText("Chat:");
    expect(chatText).toBeInTheDocument();
  });
});
