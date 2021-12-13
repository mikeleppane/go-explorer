import { ActionType, CodeAction } from "../../types";
import { defaultCode } from "../../config/codeTemplates";

export const codeReducer = (state = defaultCode, action: CodeAction) => {
  switch (action.type) {
    case ActionType.NEW_CODE:
      return action.payload;
    case ActionType.USE_DEFAULT_CODE:
      return defaultCode;
    case ActionType.LOAD_FROM_TEMPLATE:
      return action.payload;
    default:
      return state;
  }
};
