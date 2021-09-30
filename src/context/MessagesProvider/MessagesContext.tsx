import { useContext, createContext } from "react";

import { UseEntriesByGroupReturn } from "./useEntriesByGroup";

const Context = createContext<UseEntriesByGroupReturn | undefined>(undefined);

Context.displayName = "MessagesContext";

export const MessagesContext = Context.Provider;

export const useMessagesContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "Context is undefined. You may forgot wrap your component within the provider."
    );
  }

  return context;
};
