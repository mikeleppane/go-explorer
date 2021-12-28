import Typography from "@mui/material/Typography";
import * as React from "react";
import HorizontalLine from "./HorizontalLIne";
import { Box } from "@mui/material";
import FileMenuImg from "./images/file-menu.png";

const FileOptions = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <a id="File Options">File Options</a>
      </Typography>
      <HorizontalLine />
      <img src={FileMenuImg} alt="file-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        File menu allows you a few options regarding code handling. Those are
        explained better below.
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        New Template
      </Typography>
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        This option loads a default <i>Hello World</i> code template into the
        editor.
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Open Recent Changes
      </Typography>
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        The application saves your recently edited code to the browser&apos;s
        local storage continuously. At the moment this is not a tab-specific
        action. So, the recent code is from whatever tab you are currently
        working on.
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Load From Templates
      </Typography>
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        You can load a code from a few pre-stored templates. Those are picked
        based on their &quot;category&quot;, including
        <i> default, testing, benchmark, concurrency, and generics.</i> This is
        just something to let you start working on. In the future, we might add
        more of these.
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Import Code
      </Typography>
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        You can import your Go code from your local computer. It will import it
        into the currently active tab.
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Copy
      </Typography>
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        This allows you to copy the whole code from the current tab to the
        clipboard. In addition, you can accomplish similar behavior by selecting
        the lines and clicking the right mouse button to copy the selected area.
      </Typography>
    </Box>
  );
};

export default FileOptions;
