import {
  ActionType,
  AppThunk,
  DeleteCodeAction,
  LoadTemplateAction,
  NewCodeAction,
  NewTemplateAction,
  OutputAction,
  StatusAction,
  TabAction,
  TabActionType,
} from "../../types";
import { Dispatch } from "react";
import codeService from "../../services/codeService";
import {
  benchmarkCode,
  concurrencyCode,
  defaultCode,
  testingCode,
} from "../../config/codeTemplates";

type CodePayloadType = {
  [key: number]: string;
};

const createCodePayload = (id: number, code: string): CodePayloadType => {
  const payloadToBeSent: CodePayloadType = {};
  payloadToBeSent[id] = code;
  return payloadToBeSent;
};

export const addNewCode = (code: string): AppThunk => {
  return (dispatch: Dispatch<NewCodeAction>, getState) => {
    const { tab } = getState();
    dispatch({
      type: ActionType.NEW_CODE,
      payload: createCodePayload(tab.currentTab, code),
    });
  };
};

export const newTemplateCode = (): AppThunk => {
  return (dispatch: Dispatch<NewTemplateAction>, getState) => {
    const { tab } = getState();
    dispatch({
      type: ActionType.USE_DEFAULT_CODE,
      payload: createCodePayload(tab.currentTab, defaultCode),
    });
  };
};

export const loadFromTemplate = (template: string): AppThunk => {
  return (dispatch: Dispatch<LoadTemplateAction>, getState) => {
    const { tab } = getState();
    switch (template) {
      case "default": {
        dispatch({
          type: ActionType.LOAD_FROM_TEMPLATE,
          payload: createCodePayload(tab.currentTab, defaultCode),
        });
        break;
      }
      case "testing": {
        dispatch({
          type: ActionType.LOAD_FROM_TEMPLATE,
          payload: createCodePayload(tab.currentTab, testingCode),
        });
        break;
      }
      case "benchmark": {
        dispatch({
          type: ActionType.LOAD_FROM_TEMPLATE,
          payload: createCodePayload(tab.currentTab, benchmarkCode),
        });
        break;
      }
      case "concurrency": {
        dispatch({
          type: ActionType.LOAD_FROM_TEMPLATE,
          payload: createCodePayload(tab.currentTab, concurrencyCode),
        });
        break;
      }
      default:
        dispatch({
          type: ActionType.LOAD_FROM_TEMPLATE,
          payload: createCodePayload(tab.currentTab, defaultCode),
        });
        break;
    }
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
      ReturnType<typeof setStatus> | ReturnType<typeof clearOutput>
    >,
    getState
  ) => {
    dispatch(clearOutput());
    dispatch(setStatus("Wait for code execution..."));
    const state = getState();
    const code = state.code[state.tab.currentTab];
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
    const state = getState();
    const code = state.code[state.tab.currentTab];
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
    const state = getState();
    const code = state.code[state.tab.currentTab];
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

export const showEnvInfo = (version: string): AppThunk => {
  return (
    dispatch: Dispatch<
      ReturnType<typeof setStatus> | ReturnType<typeof clearOutput>
    >
  ) => {
    dispatch(clearOutput());
    dispatch(setStatus("Wait for env info..."));
    codeService
      .getInfo(version)
      .then((response) => {
        console.log(response);
        if (response && "output" in response) {
          dispatch({
            type: ActionType.ENV_INFO,
            payload: {
              output: response.output || "",
              error: "",
              binarySize: "",
              buildTime: "",
              executionTime: "",
            },
          });
          dispatch(setStatus("Environment information received successfully."));
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

export const changeCurrentTab = (id: number): TabAction => {
  return {
    type: TabActionType.CHANGE_CURRENT_TAB,
    payload: { currentTab: id },
  };
};

export const deleteCode = (id: number): DeleteCodeAction => {
  return {
    type: ActionType.DELETE_CODE,
    payload: id,
  };
};
