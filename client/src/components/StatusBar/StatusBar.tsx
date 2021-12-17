import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";

const StatusBar: FunctionComponent = () => {
  const { message, color } = useAppSelector((state) => state.status);
  const newColor = color ? color : "white";
  return (
    <Box
      sx={{
        textAlign: "left",
        margin: 0,
        padding: 0,
        position: "fixed",
        bottom: 0,
        left: 0,
        color: "white",
        backgroundColor: "#505050",
        fontSize: "16px",
        height: "22px",
        width: "100%",
        flexGrow: 1,
        fontFamily: "Source Sans Pro",
      }}
    >
      <span
        style={{
          marginLeft: "5px",
          color: newColor,
          verticalAlign: "top",
          fontSize: "inherit",
        }}
      >
        {message}
      </span>
    </Box>
  );
};

export default StatusBar;
