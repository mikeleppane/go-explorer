import React, { useEffect } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import AppHeader from "./components/AppBar/AppBar";
import MainView from "./components/MainView/MainView";
import "./styles.css";
import StatusBar from "./components/StatusBar/StatusBar";
import CodeTabs from "./components/Tabs/CodeTabs";
import { ConfirmProvider } from "material-ui-confirm";
import { useDispatch } from "react-redux";
import { addNewCode } from "./state/actionCreators";
import { fromBinary } from "./services/binaryHandler";
import Notification from "./components/Notification/Notication";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#606060",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const share = query.get("share");
    if (share) {
      const decodedCode = fromBinary(window.atob(share));
      dispatch(addNewCode(decodedCode));
    }
  }, []);

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
        <Notification />
      </ThemeProvider>
    </Box>
  );
}

export default App;
