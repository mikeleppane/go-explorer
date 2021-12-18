import { ActionType, CodeAction } from "../../types";
import { defaultCode } from "../../config/codeTemplates";

const initialState = {
  "0": defaultCode,
};

type StateType = {
  [index: string]: string;
};

export const codeReducer = (
  state: StateType = initialState,
  action: CodeAction
) => {
  switch (action.type) {
    case ActionType.NEW_CODE:
      return { ...state, ...action.payload };
    case ActionType.USE_DEFAULT_CODE:
      return { ...state, ...action.payload };
    case ActionType.LOAD_FROM_TEMPLATE:
      return { ...state, ...action.payload };
    case ActionType.DELETE_CODE:
      delete state[action.payload];
      return { ...state };
    default:
      return state;
  }
};
