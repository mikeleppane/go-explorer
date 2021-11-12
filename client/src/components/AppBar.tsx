import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import AppBarTitle from "./AppBarTitle";
import FileLoadMenu from "./FileLoadMenu";
import { Divider, Toolbar } from "@mui/material";
import FormatCodeMenu from "./CodeFormatMenu";
import LintCodeMenu from "./CodeLintMenu";

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
          <FormatCodeMenu />
          <LintCodeMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
