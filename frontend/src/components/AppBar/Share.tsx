import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toBinary } from "../../services/binaryHandler";
import { setNotification } from "../../state/actionCreators";
import { Box, IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { BASE_URL } from "../../constants";

export default function Share() {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);

  const handleShare = () => {
    const code = state.code[state.tab.currentTab];
    const encodedCode = window.btoa(toBinary(code));
    const link = `${BASE_URL}?share=${encodedCode}`;
    window.navigator.clipboard
      .writeText(link)
      .then(() =>
        dispatch(setNotification("URL with code has been copied to clipboard."))
      )
      .catch((e) => {
        console.error(e);
        if (e instanceof Error) {
          dispatch(
            setNotification(
              "An error occurred while copying url to clipboard",
              "error"
            )
          );
        }
      });
  };

  return (
    <Box>
      <Tooltip title="Share a link to your code">
        <IconButton
          id="share-button"
          sx={{
            marginLeft: "25px",
            marginRight: "10px",
            backgroundColor: "#64748B",
          }}
          onClick={handleShare}
        >
          <ShareIcon sx={{ zIndex: 10, color: "white" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
