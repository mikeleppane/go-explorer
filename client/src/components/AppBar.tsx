import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import AppBarTitle from "./AppBarTitle";
import FileLoadMenu from "./FileLoadMenu";
import { Divider, Toolbar } from "@mui/material";
import FormatCodeMenu from "./CodeFormatMenu";
import LintCodeMenu from "./CodeLintMenu";
import RunCodeMenu from "./RunCodeMenu";
import BuildCodeMenu from "./BuildCodeMenu";
import TestCodeMenu from "./TestCodeMenu";
import ShowEnvInfoMenu from "./ShowEnvInfoMenu";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" className=" Appbar">
        <Toolbar>
          <AppBarTitle />
          <FileLoadMenu />
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: "10px" }}
          />
          <RunCodeMenu />
          <BuildCodeMenu />
          <TestCodeMenu />
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: "10px" }}
          />
          <FormatCodeMenu />
          <LintCodeMenu />
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: "10px" }}
          />
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: "10px", flexGrow: 1 }}
          />
          <ShowEnvInfoMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
