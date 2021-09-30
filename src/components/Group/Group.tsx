import { Box, BoxProps } from "@mui/material";

export interface GroupProps extends BoxProps {
  title: string;
  description: string;
}

export const Group = ({ children, title, description, ...props }: GroupProps) => (
  <Box {...props}>
    <Box fontWeight="bold" fontSize="x-large">
      {title}
    </Box>
    <Box>
      {description}
    </Box>
    <Box position="relative" mt={2}>
      {children}
    </Box>
  </Box>
);