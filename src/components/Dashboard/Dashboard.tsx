import { useRef, useCallback, useEffect, useState } from "react";
import { Box, BoxProps, Snackbar, Alert } from "@mui/material";

import { MessagesProvider, useMessagesContext } from '../../context/MessagesProvider';
import { generateMessage, Priority } from "../../api/index";
import { Entry } from "../Entry";
import { Group } from "../Group";
import { DashboardActions } from "./DashboardActions";

export type DashboardProps = BoxProps;

const Dashboard = (props: DashboardProps) => {
  const [error, setError] = useState<string | null>(null);

  const [isSubscribed, setIsSubscribed] = useState(true);
  const unsubscribe = useRef<() => void>();

  const { entriesByGroup, addEntry, removeEntry, clearAll } = useMessagesContext();

  const start = useCallback(() => {
    unsubscribe.current = generateMessage((message) => {
      addEntry(message);

      if (message.priority === Priority.Error) {
        setError(message.message);
      }
    });
  }, [addEntry])
  
  useEffect(() => {
    start();

    return unsubscribe.current;
  }, [addEntry, start]);

  const handleOnSubscribe = () => {
    start();
    setIsSubscribed(true);
  }

  const handleOnUnsuscribe = () => {
    unsubscribe.current?.();
    setIsSubscribed(false);
  }

  const handleCloseSnackbar = () => {
    setError(null);
  }

  return (
    <Box position="relative">
      <DashboardActions
        isSubscribed={isSubscribed}
        onStop={handleOnUnsuscribe}
        onStart={handleOnSubscribe}
        onClear={clearAll}
      />
      <Box display="flex" py={3}>
        {Object.keys(entriesByGroup).map((key, i) => {
          const { name, entries } = entriesByGroup[key];

          return (
            <Group
              description={`Count: ${entries.length}`}
              key={i}
              title={`${name} Type ${i + 1}`}
              width={1 / 3}
              mr={1}
              sx={{
                '&:last-child': {
                  m: 0
                }
              }}
            >
              {entries.map(({ id, message, priority }) => {
                const handleOnClear = () => {
                  removeEntry({ id, priority });
                };

                return (
                  <Entry
                    key={id}
                    mb={1}
                    onClear={handleOnClear}
                    priority={priority}
                  >
                    {message}
                  </Entry>
                );
              })}
            </Group>
          );
        })}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        open={Boolean(error)}
      >
        <Alert severity="error" elevation={1} onClose={handleCloseSnackbar}>Error: {error}</Alert>
      </Snackbar>
    </Box>
  );
};

const DashboardWithContext = () => (
  <MessagesProvider>
    <Dashboard />
  </MessagesProvider>
);

export { DashboardWithContext as Dashboard }; 