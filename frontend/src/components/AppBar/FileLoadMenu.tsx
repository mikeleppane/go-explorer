import React from "react";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CachedIcon from "@mui/icons-material/Cached";
import {
  addNewCode,
  clearError,
  loadFromTemplate,
  newTemplateCode,
  setNotification,
  setStatus,
} from "../../state/actionCreators";
import { useDispatch } from "react-redux";
import { LocalStorage } from "../../services/localStorage";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function FileLoadMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [templatesOpen, setTemplatesOpen] = React.useState(false);
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);
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

  const handleCopySelectToClipboard = () => {
    const code = state.code[state.tab.currentTab];
    window.navigator.clipboard
      .writeText(code)
      .then(() => dispatch(setNotification("Code block copied to clipboard")))
      .catch((e) => {
        console.error(e);
        if (e instanceof Error) {
          dispatch(
            setNotification(
              "An error occurred while copying code block to the clipboard",
              "error"
            )
          );
        }
      });
    handleClose();
  };

  const handleNewTemplate = () => {
    dispatch(clearError());
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

  const handleLoadFromTemplate = (template: string) => {
    if (template) {
      dispatch(loadFromTemplate(template));
    }
  };

  return (
    <div>
      <Tooltip title="Open file options">
        <Button
          id="open-file-button"
          variant="contained"
          sx={{ marginLeft: "30px", backgroundColor: "#64748B" }}
          endIcon={<ArrowDownwardIcon />}
          onClick={handleMenu}
        >
          File
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
          <MenuItem id="new-template" onClick={handleNewTemplate}>
            <ListItemText>New Template...</ListItemText>
          </MenuItem>
          <MenuItem id="recent-changes" onClick={handleRecentChanges}>
            <ListItemIcon>
              <CachedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Open Recent Changes</ListItemText>
          </MenuItem>
          <ListItemButton
            onClick={() => {
              setTemplatesOpen(!templatesOpen);
            }}
            id="open-templates-button"
          >
            <ListItemText primary="Load From Templates" />
            {templatesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={templatesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                id="load-default-button"
                onClick={() => {
                  handleLoadFromTemplate("default");
                }}
              >
                <ListItemText primary="Default" />
              </ListItemButton>
              <ListItemButton
                id="load-testing-button"
                onClick={() => {
                  handleLoadFromTemplate("testing");
                }}
              >
                <ListItemText primary="Testing" />
              </ListItemButton>
              <ListItemButton
                id="load-benchmark-button"
                onClick={() => {
                  handleLoadFromTemplate("benchmark");
                }}
              >
                <ListItemText primary="Benchmark" />
              </ListItemButton>
              <ListItemButton
                id="load-concurrency-button"
                onClick={() => {
                  handleLoadFromTemplate("concurrency");
                }}
              >
                <ListItemText primary="Concurrency" />
              </ListItemButton>
              <ListItemButton
                id="load-generics-button"
                onClick={() => {
                  handleLoadFromTemplate("generics");
                }}
              >
                <ListItemText primary="Generics" />
              </ListItemButton>
            </List>
          </Collapse>
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
            <MenuItem onClick={handleCopySelectToClipboard}>
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
