import {
  ActionType,
  AppThunk,
  CodeAction,
  OutputAction,
  RunCodeAction,
  StatusAction,
} from "../../types";
import { Dispatch } from "react";
import codeService from "../../services/codeService";

export const addNewCode = (code: string): CodeAction => {
  return {
    type: ActionType.NEW_CODE,
    payload: code,
  };
};

export const newTemplateCode = (): CodeAction => {
  return {
    type: ActionType.USE_DEFAULT_CODE,
    payload: "",
  };
};

export const lintCode = (output: string): OutputAction => {
  return {
    type: ActionType.LINT_CODE,
    payload: {
      output: "",
      binarySize: "",
      buildTime: "",
      executionTime: "",
      error: output,
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
      executionTime: "",
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

export const runCode = (
  buildFlags: string,
  gogc: string,
  godebug: string,
  version: string
): AppThunk => {
  return (
    dispatch: Dispatch<
      ReturnType<typeof setStatus> | RunCodeAction | OutputAction
    >,
    getState
  ) => {
    dispatch(clearOutput());
    dispatch(setStatus("Wait for code execution..."));
    const { code } = getState();
    codeService
      .runCode({ code, buildFlags, gogc, godebug, version })
      .then((response) => {
        if (response) {
          dispatch({
            type: ActionType.RUN_CODE,
            payload: {
              output: response.output,
              binarySize: "",
              buildTime: "",
              executionTime: response.executionTime,
              error: response.error,
            },
          });
          if (response.executionTime) {
            dispatch(setStatus("Code execution ok."));
          }
          if (!response.executionTime && response.error) {
            dispatch(setStatus("Code execution failed", "red", 10));
          }
        }
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof Error) {
          dispatch(setStatus(`An error occurred: ${e.message}`, "red", 10));
        }
      });
  };
};
