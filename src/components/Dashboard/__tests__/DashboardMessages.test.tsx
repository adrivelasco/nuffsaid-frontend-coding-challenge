import { render } from "@testing-library/react";
import { MessagesProvider } from "../../../context/MessagesProvider";

import { DashboardMessages } from "../DashboardMessages";

describe("DashboardMessages", () => {
  it("renders an empty dashboard", () => {
    const { getByTestId } = render(<DashboardMessages />, {
      wrapper: ({ children }) => (
        <MessagesProvider>{children}</MessagesProvider>
      ),
    });

    const dashboardMessages = getByTestId("dashboard-messages");

    expect(dashboardMessages).toBeTruthy();
    expect(dashboardMessages).toBeEmptyDOMElement();
  });

  it("renders dashboard with entries by groups", () => {
    const { getAllByTestId } = render(<DashboardMessages />, {
      wrapper: ({ children }) => (
        <MessagesProvider
          initialValue={{
            0: {
              name: "Error",
              entries: [{ id: "1", message: "Test", priority: 0 }],
            },
            1: {
              name: "Warning",
              entries: [{ id: "2", message: "Test", priority: 1 }],
            },
          }}
        >
          {children}
        </MessagesProvider>
      ),
    });

    const groups = getAllByTestId("group");
    const entries = getAllByTestId("entry");

    expect(groups.length).toBe(2);
    expect(entries.length).toBe(2);
  });
});
