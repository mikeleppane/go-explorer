import React from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";
import { buildCode } from "../../state/actionCreators";
import { availableVersions } from "../../config/versions";
import { useHotkeys } from "react-hotkeys-hook";

export default function BuildCodeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [buildFlags, setbuildFlags] = React.useState("");
  const [gogc, setGogc] = React.useState("");
  const [godebug, setGodebug] = React.useState("");
  const [goarch, setGoarch] = React.useState("");
  const [goos, setGoos] = React.useState("");
  const [objDumpEnabled, setObjDumpEnabled] = React.useState(false);
  const [symregexp, setSymregexp] = React.useState("");
  const [version, setGoVersion] = React.useState("");
  const dispatch = useDispatch();
  const versions = availableVersions();
  useHotkeys("ctrl+alt+b", () => handleCodeExecution());

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
    dispatch(
      buildCode(
        buildFlags,
        gogc,
        godebug,
        goarch,
        goos,
        symregexp,
        version,
        objDumpEnabled
      )
    );
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Build your code (Ctrl+Alt+B)">
        <Button
          id="build-code-button"
          variant="contained"
          style={{ marginLeft: "10px", backgroundColor: "#64748B" }}
          endIcon={<PlayArrowIcon />}
          onClick={handleCodeExecution}
        >
          Build
        </Button>
      </Tooltip>
      <Tooltip title="Open build options">
        <Button
          id="build-code-option-button"
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
                  id="build-code-build-flags"
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
                  id="build-code-build-flags-link"
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
                  id="build-code-gogc-option"
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
                  id="build-code-gogc-option-link"
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
                  id="build-code-godebug-option"
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
                  id="build-code-godebug-option-link"
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
            <Box>
              <FormControl>
                <TextField
                  id="build-code-goarch-option"
                  label="GOARCH"
                  variant="standard"
                  size="small"
                  value={goarch}
                  inputProps={{ style: { fontSize: "12px" } }}
                  onChange={(event) => {
                    setGoarch(event.target.value);
                  }}
                  helperText="Enter value for GOARCH environment variable"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <a
                  id="build-code-goarch-option-link"
                  className="customlink"
                  href="https://go.dev/doc/install/source#environment"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check about GOARCH environment variable from here.
                </a>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <FormControl>
                <TextField
                  id="build-code-goos-option"
                  label="GOOS"
                  variant="standard"
                  size="small"
                  value={goos}
                  inputProps={{ style: { fontSize: "12px" } }}
                  onChange={(event) => {
                    setGoos(event.target.value);
                  }}
                  helperText="Enter value for GOOS environment variable"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <a
                  id="build-code-goos-option-link"
                  className="customlink"
                  href="https://go.dev/doc/install/source#environment"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check about GOOS environment variable from here.
                </a>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box style={{ margin: 0, padding: 0 }}>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="objDump-checkbox"
                      checked={objDumpEnabled}
                      onChange={(event) => {
                        setObjDumpEnabled(event.target.checked);
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" color="textSecondary">
                      Enable objdump
                    </Typography>
                  }
                />
                <TextField
                  id="symregexp-field"
                  label="symregexp"
                  variant="standard"
                  size="small"
                  value={symregexp}
                  inputProps={{ style: { fontSize: "12px" } }}
                  onChange={(event) => {
                    setSymregexp(event.target.value);
                  }}
                  helperText="Enter value for symregexp"
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                />
                <a
                  id="objDump-option-link"
                  className="customlink"
                  href="https://pkg.go.dev/cmd/objdump#pkg-overview"
                  target="_blank"
                  style={{ fontSize: "10px" }}
                  rel="noreferrer"
                >
                  Check more about objdump and symregexp from here.
                </a>
              </FormControl>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box component="form" noValidate autoComplete="off">
              <FormControl>
                <TextField
                  id="select-version-for-code-build"
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
