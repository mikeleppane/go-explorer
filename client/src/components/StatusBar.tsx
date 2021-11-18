import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";

const StatusBar: FunctionComponent = () => {
  const { message, color } = useAppSelector((state) => state.status);
  const newColor = color ? color : "white";
  return (
    <Box className="StatusBar">
      <span style={{ marginLeft: "5px", color: newColor }}>{message}</span>
    </Box>
  );
};

export default StatusBar;
