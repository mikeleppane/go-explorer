import React from "react";
import Button from "@mui/material/Button";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import codeService from "../services/codeService";
import { addNewCode } from "../state/actionCreators";

export default function LintCodeMenu() {
  const dispatch = useAppDispatch();
  const code = useAppSelector((state) => state.code);

  const handleLintMenu = () => {
    codeService
      .lintCode({ code })
      .then((response) => {
        if (response && typeof response === "string") {
          dispatch(addNewCode(response));
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginLeft: "30px", backgroundColor: "#64748B" }}
        endIcon={<FindInPageIcon />}
        onClick={handleLintMenu}
      >
        Lint
      </Button>
    </div>
  );
}
