import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";

const StatusBar: FunctionComponent = () => {
  const status = useAppSelector((state) => state.status);
  return (
    <Box className="StatusBar">
      <span style={{ marginLeft: "5px" }}>{status.message}</span>
    </Box>
  );
};

export default StatusBar;
