import React from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CachedIcon from "@mui/icons-material/Cached";
import {
  addNewCode,
  newTemplateCode,
  setStatus,
} from "../state/actionCreators";
import { useDispatch } from "react-redux";
import { LocalStorage } from "../services/localStorage";
import { useAppSelector } from "../hooks/useAppSelector";

export default function FileLoadMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const dispatch = useDispatch();
  const code = useAppSelector((state) => state.code);
  const storage = new LocalStorage("", "golang-explorer-recent-code");

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

  const fileUploadSelectHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      fileUploadHandler(event.target.files[0]);
    }
  };

  const CopySelectToClipboardHandler = () => {
    window.navigator.clipboard
      .writeText(code)
      .then(() => dispatch(setStatus("Code block copied to clipboard")))
      .catch((e) => {
        console.error(e);
        if (e instanceof Error) {
          dispatch(
            setStatus(
              "An error occurred while copiying code block to the clipboard",
              "red",
              10
            )
          );
        }
      });
    handleClose();
  };

  const handleNewTemplate = () => {
    dispatch(newTemplateCode());
    handleClose();
  };

  const handleRecentChanges = () => {
    if (storage.state) {
      dispatch(addNewCode(storage.state));
    } else {
      dispatch(setStatus("No recent changes available."));
    }
    handleClose();
  };

  const fileUploadHandler = (file: File) => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      if (reader.result && typeof reader.result === "string") {
        dispatch(addNewCode(reader.result));
      }
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginLeft: "30px", backgroundColor: "#64748B" }}
        endIcon={<ArrowDownwardIcon />}
        onClick={handleMenu}
      >
        File
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
          <MenuItem onClick={handleNewTemplate}>
            <ListItemText>New Template...</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleRecentChanges}>
            <ListItemIcon>
              <CachedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Open Recent Changes</ListItemText>
          </MenuItem>
          <Divider />
          <input
            accept=".go"
            style={{ display: "none", width: "100%" }}
            id="file-upload"
            type="file"
            onChange={fileUploadSelectHandler}
          />
          <label htmlFor="file-upload">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <FileUploadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Import</ListItemText>
            </MenuItem>
          </label>
          <label htmlFor="copy">
            <MenuItem onClick={CopySelectToClipboardHandler}>
              <ListItemIcon>
                <ContentCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
          </label>
        </MenuList>
      </Menu>
    </div>
  );
}
