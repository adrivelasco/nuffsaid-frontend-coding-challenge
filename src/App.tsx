import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { MessagesProvider } from "./context/MessagesProvider";
import { theme } from "./theme";

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box m="0 auto" maxWidth={{ sm: "100%", md: "1024px" }} px={2} py={2}>
      <Header />
      <MessagesProvider>
        <Dashboard />
      </MessagesProvider>
    </Box>
  </ThemeProvider>
);
