import { Box, Button } from "@mui/material";

export interface DashboardActionsProps {
  isSubscribed?: boolean;
  onClear?: () => void;
  onStart?: () => void;
  onStop?: () => void;
}

export const DashboardActions = ({
  isSubscribed,
  onClear,
  onStart,
  onStop,
}: DashboardActionsProps) => {
  return (
    <Box display="flex" justifyContent="center" py={2}>
      {isSubscribed ? (
        <Button onClick={onStop} variant="contained">
          Stop
        </Button>
      ) : (
        <Button onClick={onStart} variant="contained">
          Start
        </Button>
      )}
      <Button onClick={onClear} sx={{ ml: 2 }} variant="contained">
        Clear
      </Button>
    </Box>
  );
};
