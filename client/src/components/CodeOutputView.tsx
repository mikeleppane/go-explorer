import * as React from "react";
import { CSSProperties, FunctionComponent } from "react";
import Button from "@mui/material/Button";

const containerStyle: CSSProperties = {
  margin: "10px",
};

interface IProps {
  setPaneSize: React.Dispatch<React.SetStateAction<string>>;
}

const handleOnClick = (
  setSize: React.Dispatch<React.SetStateAction<string>>
) => {
  const defaultSize = localStorage.getItem("bottomPaneDefaultSize");
  if (defaultSize) {
    setSize(defaultSize);
    setTimeout(() => {
      setSize((window.innerHeight * 0.1001).toString() + "px");
    }, 500);
  }
};

const CodeOutputView: FunctionComponent<IProps> = ({ setPaneSize }) => {
  // const classes = useStyles;
  return (
    <div style={containerStyle}>
      <Button
        variant="contained"
        size="small"
        style={{
          position: "relative",
          top: "-5px",
          right: "-5px",
          padding: "3px",
          float: "right",
        }}
        onClick={() => handleOnClick(setPaneSize)}
      >
        Reset
      </Button>
      <p
        style={{
          textAlign: "center",
          margin: 0,
          padding: 0,
          position: "relative",
          top: "-5px",
        }}
      >
        Execution
      </p>
    </div>
  );
};

export default CodeOutputView;
