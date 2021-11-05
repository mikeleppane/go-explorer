import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBarTitle from "./AppBarTitle";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} className="Appbar">
        <Toolbar>
          <AppBarTitle />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
