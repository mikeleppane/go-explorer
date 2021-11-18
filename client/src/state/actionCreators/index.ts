import {
  ActionType,
  AppThunk,
  CodeAction,
  OutputAction,
  StatusAction,
} from "../../types";
import { Dispatch } from "react";

export const addNewCode = (code: string): CodeAction => {
  return {
    type: ActionType.NEW_CODE,
    payload: code,
  };
};

export const lintCode = (output: string): OutputAction => {
  return {
    type: ActionType.LINT_CODE,
    payload: {
      output: output,
      binarySize: "",
      buildTime: "",
      error: "",
    },
  };
};

export const clearOutput = (): OutputAction => {
  return {
    type: ActionType.CLEAR_OUTPUT,
    payload: {
      output: "",
      binarySize: "",
      buildTime: "",
      error: "",
    },
  };
};

export const setStatus = (message: string, color = "", time = 5): AppThunk => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async (dispatch: Dispatch<StatusAction>) => {
    const timeoutHandle = setTimeout(() => {
      dispatch({
        type: ActionType.CLEAR_STATUS,
        payload: {
          message: "",
          timeoutHandle: null,
          color: "",
        },
      });
    }, time * 1000);
    dispatch({
      type: ActionType.SET_STATUS,
      payload: {
        message: message,
        timeoutHandle: timeoutHandle,
        color: color,
      },
    });
  };
};

export const clearStatus = (): StatusAction => {
  return {
    type: ActionType.CLEAR_STATUS,
    payload: { message: "", timeoutHandle: null, color: "" },
  };
};
