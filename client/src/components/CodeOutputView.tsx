import * as React from "react";
import { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ICodeOutputViewProps } from "../types";
import { useAppSelector } from "../hooks/useAppSelector";

const handleOnClick = (
  setSize: React.Dispatch<React.SetStateAction<string>>
) => {
  const defaultSize = localStorage.getItem("bottomPaneDefaultSize");
  if (defaultSize) {
    setSize(defaultSize);
    setTimeout(() => {
      setSize((window.innerHeight * 0.1 + 0.1).toString() + "px");
    }, 500);
  }
};

const CodeOutputView: FunctionComponent<ICodeOutputViewProps> = ({
  setPaneSize,
}) => {
  const status = useAppSelector((state) => state.status);
  // const [timeoutHandle, setTimeoutHandle] = useState<null | NodeJS.Timeout>(
  //   null
  // );

  return (
    <Box className="CodeOutputView">
      <Button
        variant="contained"
        size="small"
        className="ResetButton"
        onClick={() => handleOnClick(setPaneSize)}
      >
        Reset
      </Button>
      <p className="CodeOutputViewTitle">Execution</p>
      {status.message && <p style={{ color: "white" }}>{status.message}</p>}
    </Box>
  );
};

export default CodeOutputView;
