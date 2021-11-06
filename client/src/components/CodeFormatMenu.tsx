import React from "react";
import Button from "@mui/material/Button";
import CodeIcon from "@mui/icons-material/Code";
import { useAppDispatch, useAppSelector } from "../types";
import codeService from "../services/codeService";
import { addNewCode } from "../state/actionsCreators/codeCreator";

export default function FormatCodeMenu() {
  const dispatch = useAppDispatch();
  const code = useAppSelector((state) => state.code);

  const handleFormatMenu = () => {
    codeService
      .formatCode({ code })
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
        endIcon={<CodeIcon />}
        onClick={handleFormatMenu}
      >
        Format
      </Button>
    </div>
  );
}
