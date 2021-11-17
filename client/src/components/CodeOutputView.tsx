import * as React from "react";
import { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ICodeOutputViewProps } from "../types";

const handleOnClick = (
  setSizes: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const defaultSize = localStorage.getItem("split-sizes");
  if (defaultSize) {
    const values: number[] = JSON.parse(defaultSize);
    setSizes([values[0] + 0.001, values[1]]);
    console.log(defaultSize);
    setTimeout(() => {
      setSizes(values);
    }, 500);
  }
};

const CodeOutputView: FunctionComponent<ICodeOutputViewProps> = ({
  setSizes,
}) => {
  return (
    <Box className="CodeOutputView">
      <Button
        variant="contained"
        size="small"
        className="ResetButton"
        onClick={() => handleOnClick(setSizes)}
      >
        Reset
      </Button>
      <p className="CodeOutputViewTitle">Execution</p>
    </Box>
  );
};

export default CodeOutputView;
