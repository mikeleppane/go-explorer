import { ActionType, OutputAction } from "../../types";

const initialState = {
  output: "",
  buildTime: "",
  binarySize: "",
  executionTime: "",
  error: "",
};

export const outputReducer = (state = initialState, action: OutputAction) => {
  switch (action.type) {
    case ActionType.LINT_CODE:
      return { ...action.payload };
    case ActionType.CLEAR_OUTPUT:
      return { ...action.payload };
    case ActionType.RUN_CODE:
      return { ...action.payload };
    case ActionType.BUILD_CODE:
      return { ...action.payload };
    default:
      return state;
  }
};
