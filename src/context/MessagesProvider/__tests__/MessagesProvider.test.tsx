import { renderHook } from "@testing-library/react-hooks";

import { useMessagesContext } from "../MessagesContext";
import { MessagesProvider, MessagesProviderProps } from "../MessagesProvider";

describe("MessagesProvider", () => {
  it("should expose as context the output of useEntriesByGroup hook", () => {
    const { result } = renderHook(() => useMessagesContext(), {
      wrapper: ({ children }: MessagesProviderProps) => {
        return (
          <MessagesProvider
            initialValue={{
              0: {
                name: "Error",
                entries: [{ id: "1", message: "Test", priority: 0 }],
              },
            }}
          >
            {children}
          </MessagesProvider>
        );
      },
    });

    const { entriesByGroup, addEntry, removeEntry, clearAll } = result.current;

    expect(entriesByGroup[0].name).toBeTruthy();
    expect(entriesByGroup[0].entries.length).toBe(1);
    expect(addEntry).toBeDefined();
    expect(removeEntry).toBeDefined();
    expect(clearAll).toBeDefined();
  });
});
