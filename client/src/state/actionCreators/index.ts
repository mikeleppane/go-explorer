import {
  ActionType,
  AppThunk,
  CodeAction,
  OutputAction,
  StatusAction,
} from "../../types";
import { Dispatch } from "react";
import codeService from "../../services/codeService";
import {
  benchmarkCode,
  concurrencyCode,
  defaultCode,
  testingCode,
} from "../../config/codeTemplates";

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

export const loadFromTemplate = (template: string): CodeAction => {
  switch (template) {
    case "default": {
      return {
        type: ActionType.LOAD_FROM_TEMPLATE,
        payload: defaultCode,
      };
    }
    case "testing": {
      return {
        type: ActionType.LOAD_FROM_TEMPLATE,
        payload: testingCode,
      };
    }
    case "benchmark": {
      return {
        type: ActionType.LOAD_FROM_TEMPLATE,
        payload: benchmarkCode,
      };
    }
    case "concurrency": {
      return {
        type: ActionType.LOAD_FROM_TEMPLATE,
        payload: concurrencyCode,
      };
    }
    default:
      return {
        type: ActionType.LOAD_FROM_TEMPLATE,
        payload: defaultCode,
      };
  }
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
      ReturnType<typeof setStatus> | ReturnType<typeof clearOutput>
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

export const testCode = (
  buildFlags: string,
  testFlags: string,
  gogc: string,
  godebug: string,
  version: string
): AppThunk => {
  return (
    dispatch: Dispatch<
      ReturnType<typeof setStatus> | ReturnType<typeof clearOutput>
    >,
    getState
  ) => {
    dispatch(clearOutput());
    dispatch(setStatus("Wait for code testing..."));
    const { code } = getState();
    codeService
      .testCode({ code, buildFlags, testFlags, gogc, godebug, version })
      .then((response) => {
        if (response) {
          dispatch({
            type: ActionType.TEST_CODE,
            payload: {
              output: response.output,
              binarySize: "",
              buildTime: "",
              executionTime: "",
              error: response.error,
            },
          });
          if (response.output && !response.error) {
            dispatch(setStatus("Code testing ok."));
          }
          if (response.error) {
            dispatch(setStatus("Code testing failed", "red", 10));
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

export const buildCode = (
  buildFlags: string,
  gogc: string,
  godebug: string,
  goarch: string,
  goos: string,
  symregexp: string,
  version: string,
  returnObjDump: boolean
): AppThunk => {
  return (
    dispatch: Dispatch<ReturnType<typeof setStatus> | OutputAction>,
    getState
  ) => {
    dispatch(clearOutput());
    dispatch(setStatus("Wait for code building..."));
    const { code } = getState();
    codeService
      .buildCode(
        {
          code,
          buildFlags,
          gogc,
          godebug,
          goarch,
          goos,
          symregexp,
          version,
        },
        returnObjDump
      )
      .then((response) => {
        if (response) {
          dispatch({
            type: ActionType.BUILD_CODE,
            payload: {
              output: response.output || "",
              binarySize: response.binarySize || "",
              buildTime: response.buildTime || "",
              executionTime: "",
              error: response.error || "",
            },
          });
          if (returnObjDump) {
            if (response.error && !response.output) {
              dispatch(setStatus("Code building failed", "red", 10));
            } else {
              dispatch(setStatus("Code building successful."));
            }
          } else {
            if (response.buildTime && response.binarySize) {
              dispatch(setStatus("Code building successful."));
            }
            if (!response.binarySize) {
              dispatch(setStatus("Code building failed", "red", 10));
            }
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
