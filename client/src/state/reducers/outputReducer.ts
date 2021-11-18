import { ActionType, OutputAction } from "../../types";

const initialState = { output: "", buildTime: "", binarySize: "", error: "" };

export const outputReducer = (state = initialState, action: OutputAction) => {
  switch (action.type) {
    case ActionType.LINT_CODE:
      return { ...action.payload };
    case ActionType.CLEAR_OUTPUT:
      return { ...action.payload };
    default:
      return state;
  }
};
