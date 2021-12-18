import { ActionType, StatusAction, StatusPayload } from "../../types";

const initialState = { message: "", timeoutHandle: null, color: "" };

const setTimeoutHandler = (
  state: StatusPayload,
  payload: StatusPayload
): StatusPayload => {
  const isPreviousTimeoutRunning =
    state.timeoutHandle && state.timeoutHandle !== payload.timeoutHandle;
  if (isPreviousTimeoutRunning && state.timeoutHandle !== null) {
    clearTimeout(state.timeoutHandle);
  }
  return { ...payload };
};

const statusReducer = (state = initialState, action: StatusAction) => {
  switch (action.type) {
    case ActionType.SET_STATUS:
      return setTimeoutHandler(state, action.payload);
    case ActionType.CLEAR_STATUS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default statusReducer;
