import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Alert, AlertColor, AlertTitle, Snackbar } from "@mui/material";
import { NotificationPayload } from "../../types";

const severitys = ["success", "info", "warning", "error"];

const capitalizeStringFirstLetter = (str: string) => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};

const Notification = () => {
  const { message, severity } = useAppSelector(
    (state) => state.notification as NotificationPayload
  );
  let severityCap = "";

  if (!message) {
    return null;
  }
  if (severity && severitys.includes(severity)) {
    severityCap = capitalizeStringFirstLetter(severity);
  } else {
    return null;
  }

  return (
    <Snackbar open={!!message} autoHideDuration={5000}>
      <Alert severity={severity as AlertColor} sx={{ width: "100%" }}>
        <AlertTitle>{severityCap}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
