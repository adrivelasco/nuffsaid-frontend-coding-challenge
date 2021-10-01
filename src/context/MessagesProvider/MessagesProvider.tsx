import { ReactNode } from "react";

import { useEntriesByGroup, EntriesByGroup } from "./useEntriesByGroup";
import { MessagesContext } from "./MessagesContext";

export interface MessagesProviderProps {
  children: ReactNode;
  initialValue?: EntriesByGroup;
}

export const MessagesProvider = ({
  children,
  initialValue,
}: MessagesProviderProps) => {
  const context = useEntriesByGroup(initialValue);

  return <MessagesContext value={context}>{children}</MessagesContext>;
};
