import React from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import AppHeader from "./components/AppBar/AppBar";
import MainView from "./components/MainView/MainView";
import "./styles.css";
import StatusBar from "./components/StatusBar/StatusBar";
import CodeTabs from "./components/Tabs/CodeTabs";
import { ConfirmProvider } from "material-ui-confirm";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#606060",
    },
  },
});

function App() {
  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <AppHeader />
        <ConfirmProvider>
          <CodeTabs />
        </ConfirmProvider>
        <MainView />
        <StatusBar />
      </ThemeProvider>
    </Box>
  );
}

export default App;
