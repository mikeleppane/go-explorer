import {
  ActionType,
  NotificationAction,
  NotificationPayload,
} from "../../types";

const initialState = {
  message: "",
  timeoutHandle: null,
  severity: "success",
};

const setTimeoutHandler = (
  state: NotificationPayload,
  payload: NotificationPayload
): NotificationPayload => {
  const isPreviousTimeoutRunning =
    state.timeoutHandle && state.timeoutHandle !== payload.timeoutHandle;
  if (isPreviousTimeoutRunning && state.timeoutHandle !== null) {
    clearTimeout(state.timeoutHandle);
  }
  return { ...payload };
};

export const notificationReducer = (
  state = initialState,
  action: NotificationAction
) => {
  switch (action.type) {
    case ActionType.SET_NOTIFICATION:
      return setTimeoutHandler(state, action.payload);
    case ActionType.CLEAR_NOTIFICATION:
      return { ...action.payload };
    default:
      return state;
  }
};
