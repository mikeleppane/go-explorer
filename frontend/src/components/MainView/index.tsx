import React, { useEffect } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewCode } from "../../state/actionCreators";
import { fromBinary } from "../../services/binaryHandler";
import AppHeader from "../AppBar/AppBar";
import { ConfirmProvider } from "material-ui-confirm";
import CodeTabs from "../Tabs/CodeTabs";
import MainView from "./MainView";
import StatusBar from "../StatusBar/StatusBar";
import Notification from "../Notification/Notication";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "white",
      //default: "#606060",
    },
  },
});

function Main() {
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

export default Main;
