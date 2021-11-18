import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";

const ResultInfo: FunctionComponent = () => {
  const { message } = useAppSelector((state) => state.status);
  return (
    <Box className="StatusBar">
      <span style={{ marginLeft: "5px" }}>{message}</span>
    </Box>
  );
};

export default ResultInfo;
