import React from "react";
import { Box, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

export default function About() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="About Go Explorer">
        <IconButton
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "#64748B",
          }}
          onClick={handleOpen}
        >
          <HelpIcon sx={{ zIndex: 10, color: "white" }} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            maxHeight: 800,
            bgcolor: "background.paper",
            border: 5,
            borderColor: "grey.500",
            borderRadius: 3,
            boxShadow: 24,
            padding: 5,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h3"
            sx={{ fontWeight: 500 }}
          >
            Go Explorer
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginTop: 5, fontSize: 18 }}
          >
            TBD
          </Typography>
          <br />
          <Typography id="modal-modal-title" variant="h4">
            About
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginTop: 5, fontSize: 18 }}
          >
            TBD
          </Typography>
          <Typography id="modal-modal-title" variant="h4">
            Features
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginTop: 5, fontSize: 18 }}
          >
            TBD
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
