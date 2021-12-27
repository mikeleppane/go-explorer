import Typography from "@mui/material/Typography";
import * as React from "react";
import HorizontalLine from "./HorizontalLIne";
import { Box } from "@mui/material";

const Features = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <a id="Limitations">Limitations</a>
      </Typography>
      <HorizontalLine />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        Take into account the following limitations while you are hacking with
        the code: networking is not allowed in your code and there are some CPU
        and memory limitations applied.
      </Typography>
    </Box>
  );
};

export default Features;
