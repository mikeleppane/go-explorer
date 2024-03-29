import React from "react";
import Button from "@mui/material/Button";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useAppSelector } from "../../hooks/useAppSelector";
import codeService from "../../services/codeService";
import {
  clearError,
  clearOutput,
  lintCode,
  newError,
  setStatus,
} from "../../state/actionCreators";
import { useDispatch } from "react-redux";
import { createErrorPayloadFromMessage } from "../../services/errorExtractor";
import { appTimeout } from "../../constants";
import { Tooltip } from "@mui/material";
import { useHotkeys } from "react-hotkeys-hook";

export default function LintCodeMenu() {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);
  useHotkeys("ctrl+alt+l", () => handleLintMenu());

  const handleLintMenu = () => {
    dispatch(clearOutput());
    dispatch(clearError());
    dispatch(setStatus("Wait for static code analysis..", "", appTimeout));
    const code = state.code[state.tab.currentTab];
    codeService
      .lintCode({ code })
      .then((response) => {
        if (response && typeof response === "string") {
          dispatch(
            setStatus(
              "Analyzer found some issues. Check the output...",
              "red",
              10
            )
          );
          dispatch(lintCode(response));
          dispatch(newError(createErrorPayloadFromMessage(response)));
        } else {
          dispatch(setStatus("Analysis ok."));
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
    <div style={{ flexGrow: 1 }}>
      <Tooltip title="Lint your code (Ctrl+Alt+L)">
        <Button
          id="lint-code-button"
          variant="contained"
          style={{ marginLeft: "10px", backgroundColor: "#64748B" }}
          endIcon={<FindInPageIcon />}
          onClick={handleLintMenu}
        >
          Lint
        </Button>
      </Tooltip>
    </div>
  );
}
