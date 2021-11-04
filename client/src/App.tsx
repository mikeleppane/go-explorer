import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./components/AppBar";
import ExplorerView from "./components/ExplorerView";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#606060",
    },
  },
});

function App() {
  return (
    <div style={{ margin: 0, padding: 0, top: 0, left: 0 }}>
      <ThemeProvider theme={darkTheme}>
        <NavBar />
        <ExplorerView />
      </ThemeProvider>
    </div>
  );
}

export default App;
