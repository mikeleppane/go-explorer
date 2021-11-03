import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import "react-reflex/styles.css";
import SplitPane from "react-split-pane/lib/SplitPane";
import Pane from "react-split-pane/lib/Pane";
import NavBar from "./components/AppBar";
import CodeEditor from "./components/CodeEditor";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div style={{ margin: 0, padding: 0, top: 0, left: 0 }}>
      <ThemeProvider theme={darkTheme}>
        <NavBar />
        <SplitPane split="horizontal" style={{ paddingTop: "50px" }}>
          <Pane
            initialSize={(window.innerHeight * 0.66).toString() + "px"}
            minSize="10%"
            primary="second"
          >
            <CodeEditor />
          </Pane>
          <Pane
            initialSize={(window.innerHeight * 0.33).toString() + "px"}
            minSize={(window.innerHeight * 0.2).toString() + "px"}
          >
            <div>Jotain teksitä</div>
          </Pane>
        </SplitPane>
        {/*<Typography>Testing...</Typography>*/}
      </ThemeProvider>
    </div>
  );
}

export default App;
