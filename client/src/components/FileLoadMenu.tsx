import React from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAppDispatch } from "../types";
import { addNewCode } from "../state/actionsCreators/codeCreator";

export default function FileLoadMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const dispatch = useAppDispatch();

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

  const fileCopySelectHandler = () => {
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
      >
        <MenuList>
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
            <MenuItem onClick={fileCopySelectHandler}>
              <ListItemIcon>
                <ContentCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy </ListItemText>
            </MenuItem>
          </label>
        </MenuList>
      </Menu>
    </div>
  );
}
