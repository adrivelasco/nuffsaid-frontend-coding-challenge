import { ReactNode } from "react";

import { useEntriesByGroup } from './useEntriesByGroup';
import { MessagesContext } from "./MessagesContext";

export interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const context = useEntriesByGroup();

  return (
    <MessagesContext value={context}>
      {children}
    </MessagesContext>
  );
}