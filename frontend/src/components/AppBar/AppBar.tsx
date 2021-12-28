import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import AppBarTitle from "./AppBarTitle";
import FileLoadMenu from "./FileLoadMenu";
import { Divider, Toolbar } from "@mui/material";
import FormatCodeMenu from "./FormatCodeMenu";
import LintCodeMenu from "./LintCodeMenu";
import RunCodeMenu from "./RunCodeMenu";
import BuildCodeMenu from "./BuildCodeMenu";
import TestCodeMenu from "./TestCodeMenu";
import ShowEnvInfoMenu from "./ShowEnvInfoMenu";
import Share from "./Share";
import Help from "./Help";

export default function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          position: "static",
          margin: 0,
          padding: 0,
          top: 0,
          left: 0,
        }}
      >
        <Toolbar variant="dense">
          <AppBarTitle />
          <FileLoadMenu />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginLeft: "10px" }}
          />
          <RunCodeMenu />
          <BuildCodeMenu />
          <TestCodeMenu />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginLeft: "10px" }}
          />
          <FormatCodeMenu />
          <LintCodeMenu />
          <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />
          <Share />
          <ShowEnvInfoMenu />
          <Help />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
