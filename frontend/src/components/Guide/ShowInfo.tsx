import Typography from "@mui/material/Typography";
import * as React from "react";
import HorizontalLine from "./HorizontalLIne";
import { Box } from "@mui/material";
import ShowInfoMenuImg from "./images/showinfo-menu.png";

const ShowInfo = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <a id="Show Info">Show Info</a>
      </Typography>
      <HorizontalLine />
      <img src={ShowInfoMenuImg} alt="test-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        You can use this option to see the default Go environment variables for
        a given version. In addition, it will show some info about the
        underlining CPU architecture
      </Typography>
    </Box>
  );
};

export default ShowInfo;
