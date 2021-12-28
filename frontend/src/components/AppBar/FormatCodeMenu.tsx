import React from "react";
import Button from "@mui/material/Button";
import CodeIcon from "@mui/icons-material/Code";
import { useAppSelector } from "../../hooks/useAppSelector";
import codeService from "../../services/codeService";
import { addNewCode, clearError, setStatus } from "../../state/actionCreators";
import { useDispatch } from "react-redux";
import { LocalStorage } from "../../services/localStorage";
import { appTimeout } from "../../constants";
import { Tooltip } from "@mui/material";

export default function FormatCodeMenu() {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);
  const storage = new LocalStorage("", "golang-explorer-recent-code");

  const handleFormatMenu = () => {
    const code = state.code[state.tab.currentTab];
    dispatch(setStatus("Wait for code formatting...", "", appTimeout));
    dispatch(clearError());
    codeService
      .formatCode({ code })
      .then((response) => {
        if (response && typeof response === "string") {
          dispatch(addNewCode(response));
          dispatch(setStatus("Code formatting ok."));
          storage.state = response;
        }
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof Error) {
          dispatch(setStatus(`An error occurred: ${e.message}`, "red", 10));
        }
      });
  };

  return (
    <div>
      <Tooltip title="Format your code">
        <Button
          variant="contained"
          style={{ marginLeft: "10px", backgroundColor: "#64748B" }}
          endIcon={<CodeIcon />}
          onClick={handleFormatMenu}
        >
          Format
        </Button>
      </Tooltip>
    </div>
  );
}
