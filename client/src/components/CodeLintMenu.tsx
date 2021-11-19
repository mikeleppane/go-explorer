import React from "react";
import Button from "@mui/material/Button";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useAppSelector } from "../hooks/useAppSelector";
import codeService from "../services/codeService";
import { clearOutput, lintCode, setStatus } from "../state/actionCreators";
import { useDispatch } from "react-redux";

export default function LintCodeMenu() {
  const dispatch = useDispatch();
  const code = useAppSelector((state) => state.code);

  const handleLintMenu = () => {
    dispatch(clearOutput());
    dispatch(setStatus("Wait for static code analysis.."));
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
    <div>
      <Button
        variant="contained"
        style={{ marginLeft: "10px", backgroundColor: "#64748B" }}
        endIcon={<FindInPageIcon />}
        onClick={handleLintMenu}
      >
        Lint
      </Button>
    </div>
  );
}
