import Typography from "@mui/material/Typography";
import * as React from "react";
import HorizontalLine from "./HorizontalLIne";
import { Box } from "@mui/material";
import ShareMenuImg from "./images/share-menu.png";

const ShareCode = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <a id="Sharing Code">Sharing Code</a>
      </Typography>
      <HorizontalLine />
      <img src={ShareMenuImg} alt="test-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        You can share your code with your friends by a link (or use shortcut:
        Ctrl+Alt+S). This allows you to quickly and easily send your code
        snippet to someone and they just need to open it in a browser.
      </Typography>
    </Box>
  );
};

export default ShareCode;
