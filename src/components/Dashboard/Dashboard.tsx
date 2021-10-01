import { useRef, useCallback, useEffect, useState } from "react";
import { Box, BoxProps, Snackbar, Alert } from "@mui/material";

import { useMessagesContext } from "../../context/MessagesProvider";
import { generateMessage, Priority } from "../../api";
import { DashboardActions } from "./DashboardActions";
import { DashboardMessages } from "./DashboardMessages";

export type DashboardProps = BoxProps;

export const Dashboard = (props: DashboardProps) => {
  const [error, setError] = useState<string | null>(null);

  const [isSubscribed, setIsSubscribed] = useState(true);
  const unsubscribe = useRef<() => void>();

  const { addEntry, clearAll } = useMessagesContext();

  const start = useCallback(() => {
    unsubscribe.current = generateMessage((message) => {
      addEntry(message);

      if (message.priority === Priority.Error) {
        setError(message.message);
      }
    });
  }, [addEntry]);

  useEffect(() => {
    start();

    return unsubscribe.current;
  }, [addEntry, start]);

  const handleOnSubscribe = () => {
    start();
    setIsSubscribed(true);
  };

  const handleOnUnsuscribe = () => {
    unsubscribe.current?.();
    setIsSubscribed(false);
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Box position="relative">
      <DashboardActions
        isSubscribed={isSubscribed}
        onStop={handleOnUnsuscribe}
        onStart={handleOnSubscribe}
        onClear={clearAll}
      />
      <DashboardMessages />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        open={Boolean(error)}
      >
        <Alert severity="error" elevation={1} onClose={handleCloseSnackbar}>
          Error: {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const DashboardListener = () => {};
