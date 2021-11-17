import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./components/AppBar";
import ExplorerView from "./components/ExplorerView";
import "./styles.css";
import StatusBar from "./components/StatusBar";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#606060",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <NavBar />
        <ExplorerView />
        <StatusBar />
      </ThemeProvider>
    </div>
  );
}

export default App;
