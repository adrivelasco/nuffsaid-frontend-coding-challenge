import { Box, BoxProps, Button, useTheme } from "@mui/material";

import { Priority } from "../../api";

export interface EntryProps extends BoxProps, UseGetBgColorByPriorityProps {
  onClear: () => void;
}

export const Entry = ({
  children,
  priority,
  onClear,
  ...props
}: EntryProps) => {
  const bgcolor = useGetBgColorByPriority({ priority });

  return (
    <Box
      bgcolor={bgcolor}
      boxShadow="0 1px 1px rgba(0, 0, 0, 0.25)"
      position="relative"
      px={2}
      py={2}
      {...props}
    >
      <Box position="relative">{children}</Box>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onClear} variant="text">
          Clear
        </Button>
      </Box>
    </Box>
  );
};

interface UseGetBgColorByPriorityProps {
  priority: Priority;
}

const useGetBgColorByPriority = ({
  priority,
}: UseGetBgColorByPriorityProps) => {
  const theme = useTheme();

  const colors = {
    [Priority.Error]: "error",
    [Priority.Warn]: "warning",
    [Priority.Info]: "info",
  } as const;

  return priority in colors ? theme.palette[colors[priority]].main : undefined;
};
