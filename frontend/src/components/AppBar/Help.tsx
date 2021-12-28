import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <div>
      <Tooltip title="About Go Explorer">
        <Link to="/help" target="_blank">
          <IconButton
            id="open-help"
            sx={{
              marginLeft: "10px",
              marginRight: "0px",
              backgroundColor: "#64748B",
            }}
          >
            <HelpIcon sx={{ zIndex: 10, color: "white" }} />
          </IconButton>
        </Link>
      </Tooltip>
    </div>
  );
}
