import { ActionType, CodeAction } from "../../types";
import { Dispatch } from "react";

export const addNewCode =
  (code: string) => (dispatch: Dispatch<CodeAction>) => {
    dispatch({
      type: ActionType.NEW_CODE,
      payload: code,
    } as const);
  };

export const lintCode = (output: string) => {
  return {
    type: ActionType.LINT_CODE,
    payload: output,
  };
};

export const setStatus = (message: string) => {
  return {
    type: ActionType.SET_STATUS,
    payload: { message },
  };

  // // eslint-disable-next-line @typescript-eslint/require-await
  // return async (dispatch: ThunkDispatch<unknown, unknown, StatusAction>) => {
  //   const timeoutHandle = setTimeout(() => {
  //     dispatch({
  //       type: ActionType.CLEAR_STATUS,
  //       payload: {
  //         message: "",
  //         timeoutHandle: null,
  //       },
  //     });
  //   }, time * 1000);
  //   dispatch({
  //     type: ActionType.SET_STATUS,
  //     payload: {
  //       message: message,
  //       timeoutHandle: timeoutHandle,
  //     },
  //   });
  // };
};

export const clearStatus = () => {
  return {
    type: ActionType.CLEAR_STATUS,
    payload: { message: "" },
  };
};
