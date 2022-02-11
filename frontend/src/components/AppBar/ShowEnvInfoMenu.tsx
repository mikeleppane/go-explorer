import React from "react";
import Button from "@mui/material/Button";
import { showEnvInfo } from "../../state/actionCreators";
import { useDispatch } from "react-redux";
import {
  Box,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  TextField,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { availableVersions } from "../../config/versions";

export default function ShowEnvInfoMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const dispatch = useDispatch();
  const [version, setGoVersion] = React.useState("");
  const versions = availableVersions();

  const handleEnvInfoMenu = () => {
    dispatch(showEnvInfo(version));
    handleClose();
  };

  const handleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const getLinkToReleaseNotes = () => {
    if (version) return `https://go.dev/doc/go${version}`;
    return `https://go.dev/doc/go${versions[0]}`;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Show info about Go environment variables and used CPU architecture">
        <IconButton
          id="open-env-info-button"
          sx={{
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "#64748B",
          }}
          onClick={handleMenu}
        >
          <InfoIcon sx={{ zIndex: 10, color: "white" }} />
        </IconButton>
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
                  id="select-version-for-get-info"
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
                <a
                  id="build-code-build-flags-link"
                  className="customlink"
                  href={`https://go.dev/doc/go${versions[0]}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "16px", marginBottom: "10px" }}
                  onClick={(event) => {
                    event.currentTarget.href = getLinkToReleaseNotes();
                  }}
                >
                  What&apos;s new
                </a>
                <Button
                  id="get-env-info-button"
                  variant="contained"
                  size="small"
                  sx={{
                    margin: "2px",
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: "#64748B",
                  }}
                  onClick={handleEnvInfoMenu}
                >
                  Get info
                </Button>
              </FormControl>
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
