import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useEntriesByGroup } from "../useEntriesByGroup";

describe("useEntriesByGroup", () => {
  it("should return an empty object of entries by group", () => {
    const { result } = renderHook(() => useEntriesByGroup());

    expect(result.current.entriesByGroup).toMatchObject({});
  });

  it("should add an entry to the group", () => {
    const { result } = renderHook(() => useEntriesByGroup());

    act(() => {
      result.current.addEntry({
        message: "Testing",
        priority: 0,
      });
    });

    const { entriesByGroup } = result.current;

    expect(entriesByGroup).toBeInstanceOf(Object);
    expect(entriesByGroup[0].name).toBeDefined();
    expect(entriesByGroup[0].entries.length).toBe(1);
  });

  it("should remove an entry from the group", () => {
    const { result } = renderHook(() =>
      useEntriesByGroup({
        0: {
          name: "Error",
          entries: [{ id: "1", message: "Test", priority: 0 }],
        },
      })
    );

    act(() => {
      const entryId = result.current.entriesByGroup[0].entries[0].id;

      result.current.removeEntry({ id: entryId, priority: 0 });
    });

    const { entriesByGroup } = result.current;

    expect(entriesByGroup[0].entries.length).toBe(0);
  });

  it("should remove all entries", () => {
    const { result } = renderHook(() =>
      useEntriesByGroup({
        0: {
          name: "Error",
          entries: [{ id: "1", message: "Test", priority: 0 }],
        },
        1: {
          name: "Warning",
          entries: [{ id: "2", message: "Test", priority: 1 }],
        },
      })
    );

    act(() => {
      result.current.clearAll();
    });

    const { entriesByGroup } = result.current;

    expect(entriesByGroup[0].entries.length).toBe(0);
    expect(entriesByGroup[1].entries.length).toBe(0);
  });
});
