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
import { useDispatch } from "react-redux";
import { runCode } from "../../state/actionCreators";

const availableGoVersions = ["1.17", "1.16"];

export default function RunCodeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [buildFlags, setbuildFlags] = React.useState("");
  const [gogc, setGogc] = React.useState("");
  const [godebug, setGodebug] = React.useState("");
  const [version, setGoVersion] = React.useState("");
  const dispatch = useDispatch();

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

  const handleCodeExecution = () => {
    dispatch(runCode(buildFlags, gogc, godebug, version));
    handleClose();
  };

  return (
    <div>
      <Button
        id="run-code-button"
        variant="contained"
        style={{ marginLeft: "10px", backgroundColor: "#64748B" }}
        endIcon={<PlayArrowIcon />}
        onClick={handleCodeExecution}
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
                  label="Build flags"
                  variant="standard"
                  size="small"
                  value={buildFlags}
                  inputProps={{ style: { fontSize: "12px" } }}
                  onChange={(event) => {
                    setbuildFlags(event.target.value);
                  }}
                  helperText="Enter build flags"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <Link
                  href="https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
                  target="_blank"
                  style={{ fontSize: "10px" }}
                >
                  Check GO build options from here.
                </Link>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box component="form" noValidate autoComplete="off">
              <FormControl>
                <TextField
                  id='margin="dense"'
                  label="GOGC"
                  variant="standard"
                  size="small"
                  value={gogc}
                  inputProps={{ style: { fontSize: "12px" } }}
                  onChange={(event) => {
                    setGogc(event.target.value);
                  }}
                  helperText="Enter value for GOGC environment variable"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <Link
                  href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
                  target="_blank"
                  style={{ fontSize: "10px" }}
                >
                  Check about GOGC environment variable from here.
                </Link>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <FormControl>
                <TextField
                  id='margin="dense"'
                  label="GODEBUG"
                  variant="standard"
                  size="small"
                  value={godebug}
                  inputProps={{ style: { fontSize: "12px" } }}
                  onChange={(event) => {
                    setGodebug(event.target.value);
                  }}
                  helperText="Enter value for GODEBUG environment variable"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <Link
                  href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
                  target="_blank"
                  style={{ fontSize: "10px" }}
                >
                  Check about GODEBUG environment variable from here.
                </Link>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box component="form" noValidate autoComplete="off">
              <FormControl>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Go version"
                  value={version}
                  onChange={(event) => {
                    setGoVersion(event.target.value);
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Select the GO version"
                  variant="standard"
                >
                  {availableGoVersions.map((version) => (
                    <option key={version} value={version}>
                      {version}
                    </option>
                  ))}
                </TextField>
              </FormControl>
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}