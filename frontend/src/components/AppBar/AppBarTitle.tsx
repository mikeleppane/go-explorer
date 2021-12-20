import React from "react";
import { Box, Typography } from "@mui/material";

export default function AppTitle() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 0,
      }}
    >
      <Typography
        paragraph={true}
        sx={{
          textAlign: "center",
          margin: 0,
          padding: 0,
          fontSize: "22px",
          fontWeight: "bold",
          lineHeight: "22px",
        }}
      >
        GO <br />
        Explorer
      </Typography>
    </Box>
  );
}
