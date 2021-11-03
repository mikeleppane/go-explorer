import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// const useStyles = makeStyles((_theme: Theme) =>
//   createStyles({
//     appbar: {},
//   })
// );

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
          <h3>
            Golang <br /> Explorer
          </h3>
          {/*<IconButton*/}
          {/*  size="large"*/}
          {/*  edge="start"*/}
          {/*  color="inherit"*/}
          {/*  aria-label="menu"*/}
          {/*  sx={{ mr: 2 }}*/}
          {/*>*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
