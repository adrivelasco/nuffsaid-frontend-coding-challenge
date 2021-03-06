import * as uuid from "uuid";
import { useCallback, useState } from "react";

import { Entry, Group } from "../../types";
import { getPriorityName } from "../../utils";

export type EntriesByGroup = {
  [key: string]: Group<Entry>;
};

export const useEntriesByGroup = (initialValue?: EntriesByGroup) => {
  const [entriesByGroup, setEntriesByGroup] = useState<EntriesByGroup>(
    initialValue ?? {}
  );

  const addEntry = useCallback(
    ({ priority, message }: Pick<Entry, "message" | "priority">) => {
      const entry = {
        id: uuid.v4(),
        priority,
        message,
      } as Entry;

      setEntriesByGroup((entriesByGroup) => {
        const state = entriesByGroup;

        if (priority in state) {
          return {
            ...state,
            [priority]: {
              ...state[priority],
              entries: [entry, ...state[priority].entries],
            },
          };
        }

        const group = {
          name: getPriorityName(priority),
          entries: [entry],
        } as Group<Entry>;

        return { ...state, [priority]: group };
      });
    },
    []
  );

  const removeEntry = useCallback(
    ({ id, priority }: Pick<Entry, "id" | "priority">) => {
      setEntriesByGroup((entriesByGroup) => {
        const state = entriesByGroup;

        return {
          ...state,
          [priority]: {
            ...state[priority],
            entries: state[priority].entries.filter((entry) => id !== entry.id),
          },
        };
      });
    },
    []
  );

  const clearAll = useCallback(() => {
    setEntriesByGroup((entriesByGroup) =>
      Object.keys(entriesByGroup).reduce(
        (acc, current) => ({
          ...acc,
          [current]: {
            ...acc[current],
            entries: [],
          },
        }),
        entriesByGroup
      )
    );
  }, []);

  return {
    addEntry,
    entriesByGroup,
    removeEntry,
    clearAll,
  };
};

export type UseEntriesByGroupReturn = ReturnType<typeof useEntriesByGroup>;
