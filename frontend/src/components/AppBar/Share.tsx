import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setNotification } from "../../state/actionCreators";
import { Box, IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { BASE_URL } from "../../constants";
import { useHotkeys } from "react-hotkeys-hook";
import LZString from "lz-string";

export default function Share() {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);
  useHotkeys("ctrl+alt+s", () => handleShare());

  const handleShare = () => {
    const code = state.code[state.tab.currentTab];
    const encodedCode: string = LZString.compressToEncodedURIComponent(code);
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
      <Tooltip title="Share a link to your code (Ctrl+Alt+S)">
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
