import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./services/redux/store";

describe("App tests", () => {
  it("should render the title", () => {
    render(<Provider store={store}><App /></Provider>);

    const headerElement = screen.getByText("CalSTRS Chatbot POC​");

    expect(headerElement).toBeInTheDocument();
  });
});
