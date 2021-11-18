import React from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  FormControl,
  Link,
  Menu,
  MenuItem,
  MenuList,
  TextField,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function RunCodeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  // const dispatch = useDispatch();
  // const code = useAppSelector((state) => state.code);
  // const storage = new LocalStorage("", "golang-explorer-recent-code");

  const handleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleNewTemplate = () => {
  //   dispatch(newTemplateCode());
  //   handleClose();
  // };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginLeft: "10px", backgroundColor: "#64748B" }}
        endIcon={<PlayArrowIcon />}
        onClick={handleMenu}
      >
        Run
      </Button>
      <Button
        variant="contained"
        style={{
          margin: "2px",
          paddingLeft: 0,
          paddingRight: 0,
          backgroundColor: "#64748B",
        }}
        endIcon={<ArrowDownwardIcon />}
        onClick={handleMenu}
      >
        ...
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ marginTop: "5px" }}
      >
        <MenuList>
          <MenuItem>
            <Box component="form" noValidate autoComplete="off">
              <FormControl>
                <TextField
                  id='margin="dense"'
                  label="Build options"
                  variant="standard"
                />
                <Link href="#" style={{ fontSize: "10px" }}>
                  Link
                </Link>
              </FormControl>
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
