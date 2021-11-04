import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBarTitle from "./AppBarTitle";

export default function NavBar() {
  // const classes = useStyles;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        style={{ position: "static", margin: 0, padding: 0, top: 0, left: 0 }}
        position="static"
      >
        <Toolbar>
          <AppBarTitle />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
