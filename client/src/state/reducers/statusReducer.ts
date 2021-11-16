import { ActionType, StatusAction } from "../../types";

const initialState = { message: "" };

// const setTimeoutHandler = (
//   state: StatusActionPayload,
//   data: StatusActionPayload
// ) => {
//   const isPreviousTimeoutRunning =
//     state.timeoutHandle && state.timeoutHandle !== data.timeoutHandle;
//   if (isPreviousTimeoutRunning && typeof state.timeoutHandle === "number") {
//     clearTimeout(state.timeoutHandle);
//   }
//   return { ...data };
// };

const statusReducer = (state = initialState, action: StatusAction) => {
  switch (action.type) {
    case ActionType.SET_STATUS:
      return { ...action.payload };
    case ActionType.CLEAR_STATUS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default statusReducer;
