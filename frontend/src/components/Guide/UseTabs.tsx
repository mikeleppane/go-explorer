import Typography from "@mui/material/Typography";
import * as React from "react";
import HorizontalLine from "./HorizontalLIne";
import { Box } from "@mui/material";
import TabMenuImg from "./images/tabs.png";

const UseTabs = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        <a id="Using Tabs">Using Tabs</a>
      </Typography>
      <HorizontalLine />
      <img src={TabMenuImg} alt="test-menu" style={{ marginTop: "5px" }} />
      <Typography paragraph sx={{ marginTop: "10px", fontSize: "18px" }}>
        The application allows you to use tabs. You can create and remove them
        as you like. The only exception is that the first tab called
        &quot;MAIN&quot; is static. You cannot remove it but otherwise, there
        are no restrictions. Remember that all the actions are always
        done/executed for the current tab. Before removing a tab you will be
        asked a confirmation to close the tab. This is done so that you
        don&apos;t accidentally remove anything crucial. After removing a tab,
        you will lose all the code in that tab, if it is not saved to the local
        storage.
      </Typography>
    </Box>
  );
};

export default UseTabs;
