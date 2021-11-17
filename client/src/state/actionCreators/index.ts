import { ActionType, AppThunk, CodeAction, StatusAction } from "../../types";
import { Dispatch } from "react";

export const addNewCode = (code: string): CodeAction => {
  return {
    type: ActionType.NEW_CODE,
    payload: code,
  };
};

export const lintCode = (output: string): CodeAction => {
  return {
    type: ActionType.LINT_CODE,
    payload: output,
  };
};

export const setStatus = (message: string): AppThunk => {
  // return {
  //   type: ActionType.SET_STATUS,
  //   payload: { message },
  // };

  // eslint-disable-next-line @typescript-eslint/require-await
  return async (dispatch: Dispatch<StatusAction>) => {
    const timeoutHandle = setTimeout(() => {
      dispatch({
        type: ActionType.CLEAR_STATUS,
        payload: {
          message: "",
          //timeoutHandle: null,
        },
      });
    }, 3 * 1000);
    dispatch({
      type: ActionType.SET_STATUS,
      payload: {
        message: message,
        //timeoutHandle: timeoutHandle,
      },
    });
  };
};

export const clearStatus = (): StatusAction => {
  return {
    type: ActionType.CLEAR_STATUS,
    payload: { message: "" },
  };
};
