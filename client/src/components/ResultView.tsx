import * as React from "react";
import { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ICodeOutputViewProps } from "../types";
import Output from "./Output";
import { useDispatch } from "react-redux";
import { clearOutput } from "../state/actionCreators";

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

const ResultView: FunctionComponent<ICodeOutputViewProps> = ({ setSizes }) => {
  const dispatch = useDispatch();
  return (
    <Box className="CodeOutputView">
      <Button
        variant="contained"
        size="small"
        className="ResetButton"
        onClick={() => {
          dispatch(clearOutput());
          handleOnClick(setSizes);
        }}
      >
        Reset
      </Button>
      <p className="CodeOutputViewTitle">Execution</p>
      <Output />
    </Box>
  );
};

export default ResultView;
