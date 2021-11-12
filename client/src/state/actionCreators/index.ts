import { ActionType } from "../../types";

export const addNewCode = (code: string) => {
  return {
    type: ActionType.NEW_CODE,
    payload: code,
  };
};

export const lintCode = (output: string) => {
  return {
    type: ActionType.LINT_CODE,
    payload: output,
  };
};

export const loading = (description: string) => {
  return {
    type: ActionType.LOADING,
    payload: description,
  };
};
