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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";
import { testCode } from "../../state/actionCreators";
import { availableVersions } from "../../config/versions";

export default function TestCodeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [buildFlags, setBuildFlags] = React.useState("");
  const [testFlags, setTestFlags] = React.useState("");
  const [gogc, setGoGC] = React.useState("");
  const [godebug, setGoDebug] = React.useState("");
  const [version, setGoVersion] = React.useState("");
  const dispatch = useDispatch();
  const versions = availableVersions();

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
    dispatch(testCode(buildFlags, testFlags, gogc, godebug, version));
    handleClose();
  };

  return (
    <div>
      <Button
        id="test-button"
        variant="contained"
        style={{ marginLeft: "10px", backgroundColor: "#64748B" }}
        endIcon={<PlayArrowIcon />}
        onClick={handleCodeExecution}
      >
        Testing
      </Button>
      <Button
        id="test-option-button"
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
                    setBuildFlags(event.target.value);
                  }}
                  helperText="Enter build flags"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <a
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
                  id="test-flags-field"
                  label="Testing flags"
                  variant="standard"
                  size="small"
                  value={testFlags}
                  inputProps={{ style: { fontSize: "12px" } }}
                  onChange={(event) => {
                    setTestFlags(event.target.value);
                  }}
                  helperText="Enter testing flags"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <a
                  className="customlink"
                  href="https://pkg.go.dev/cmd/go#hdr-Testing_flags"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check Go testing options from here.
                </a>
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
                    setGoGC(event.target.value);
                  }}
                  helperText="Enter value for GOGC environment variable"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <a
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
                  id='margin="dense"'
                  label="GODEBUG"
                  variant="standard"
                  size="small"
                  value={godebug}
                  inputProps={{ style: { fontSize: "12px" } }}
                  onChange={(event) => {
                    setGoDebug(event.target.value);
                  }}
                  helperText="Enter value for GODEBUG environment variable"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <a
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
