import * as React from "react";
import { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { clearOutput } from "../../state/actionCreators";
import { Typography } from "@mui/material";
import CodeOutput from "./CodeOutput";

interface CodeOutputViewProps {
  setSizes: React.Dispatch<React.SetStateAction<number[]>>;
}

const handleOnClick = (
  setSizes: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const defaultSize = localStorage.getItem("split-sizes");
  if (defaultSize) {
    const values: number[] = JSON.parse(defaultSize);
    setSizes([values[0] + 0.001, values[1]]);
    setTimeout(() => {
      setSizes(values);
    }, 500);
  }
};

const ResultView: FunctionComponent<CodeOutputViewProps> = ({ setSizes }) => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        margin: "10px",
        backgroundColor: "#171421",
        height: "calc(100vh - 125px)",
      }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{
          position: "relative",
          top: "-5px",
          right: "-5px",
          float: "right",
          maxWidth: "12px",
          maxHeight: "18px",
          fontSize: "12px",
          zIndex: 5,
        }}
        onClick={() => {
          dispatch(clearOutput());
          handleOnClick(setSizes);
        }}
      >
        Reset
      </Button>
      <Typography
        paragraph={true}
        sx={{
          textAlign: "center",
          margin: 0,
          padding: 0,
          position: "relative",
          top: "-5px",
          color: "white",
          fontSize: "16px",
          fontFamily: "Source Sans Pro",
        }}
      >
        Execution
      </Typography>
      <CodeOutput />
    </Box>
  );
};

export default ResultView;
