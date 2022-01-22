import React from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  FormControl,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";
import { runCode } from "../../state/actionCreators";
import { availableVersions } from "../../config/versions";
import { useHotkeys } from "react-hotkeys-hook";

export default function RunCodeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [buildFlags, setbuildFlags] = React.useState("");
  const [gogc, setGogc] = React.useState("");
  const [godebug, setGodebug] = React.useState("");
  const [version, setGoVersion] = React.useState("");
  const dispatch = useDispatch();
  const versions = availableVersions();
  useHotkeys("ctrl+alt+Enter", () => handleCodeExecution());

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
      <Tooltip title="Run your code (Ctrl+Alt+Enter)">
        <Button
          id="run-code-button"
          variant="contained"
          style={{ marginLeft: "10px", backgroundColor: "#64748B" }}
          endIcon={<PlayArrowIcon />}
          onClick={handleCodeExecution}
        >
          Run
        </Button>
      </Tooltip>
      <Tooltip title="Open run options">
        <Button
          id="run-option-button"
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
      </Tooltip>
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
                  id="run-code-build-flags"
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
                <a
                  id="run-code-build-option-link"
                  className="customlink"
                  href="https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check Go build options from here.
                </a>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box component="form" noValidate autoComplete="off">
              <FormControl>
                <TextField
                  id="run-code-gogc-option"
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
                <a
                  id="run-code-gogc-option-link"
                  className="customlink"
                  href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check about GOGC environment variable from here.
                </a>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <FormControl>
                <TextField
                  id="run-code-godebug-option"
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
                <a
                  id="run-code-godebug-option-link"
                  className="customlink"
                  href="https://pkg.go.dev/runtime#hdr-Environment_Variables"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check about GODEBUG environment variable from here.
                </a>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box component="form" noValidate autoComplete="off">
              <FormControl>
                <TextField
                  id="select-version-for-code"
                  select
                  label="Go version"
                  value={version}
                  onChange={(event) => {
                    setGoVersion(event.target.value);
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Select the Go version"
                  variant="standard"
                >
                  {versions.map((version) => (
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
