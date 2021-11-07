import { ActionType } from "../../types";

export const addNewCode = (code: string) => {
  return {
    type: ActionType.NEW_CODE,
    payload: code,
  };
};
