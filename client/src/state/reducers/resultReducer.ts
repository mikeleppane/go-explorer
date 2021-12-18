import { ActionType, ResultAction } from "../../types";

const initialState = {
  output: "",
  buildTime: "",
  binarySize: "",
  executionTime: "",
  error: "",
};

export const resultReducer = (state = initialState, action: ResultAction) => {
  switch (action.type) {
    case ActionType.LINT_CODE:
      return { ...action.payload };
    case ActionType.CLEAR_OUTPUT:
      return { ...action.payload };
    case ActionType.RUN_CODE:
      return { ...action.payload };
    case ActionType.BUILD_CODE:
      return { ...action.payload };
    case ActionType.TEST_CODE:
      return { ...action.payload };
    case ActionType.ENV_INFO:
      return { ...action.payload };
    default:
      return state;
  }
};
