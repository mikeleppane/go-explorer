import * as React from "react";
import { store } from "./state";
import reducers from "./state/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export interface ICodeOutputViewProps {
  setSizes: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface BuildCodeParams {
  code: string;
  goarch?: string;
  goos?: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  symregexp?: string;
  version?: string;
}

export interface RunCodeParams {
  code: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  version?: string;
}

export interface TestCodeParams {
  code: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  testFlags?: string;
  version?: string;
}

export interface CodeParams {
  code: string;
  version?: string;
}

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export enum ActionType {
  NEW_CODE = "NEW_CODE",
  LINT_CODE = "LINT_CODE",
  SET_STATUS = "SET_STATUS",
  CLEAR_STATUS = "CLEAR_STATUS",
}

interface NewCodeAction {
  type: ActionType.NEW_CODE;
  payload: string;
}

interface LintCodeAction {
  type: ActionType.LINT_CODE;
  payload: string;
}

// interface LoadingAction {
//   type: ActionType.LOADING;
//   payload: string;
// }

export interface StatusActionPayload {
  message: string;
  //timeoutHandle: number | null;
}

interface SetStatusAction {
  type: ActionType.SET_STATUS;
  payload: StatusActionPayload;
}

interface ClearAction {
  type: ActionType.CLEAR_STATUS;
  payload: StatusActionPayload;
}

export type CodeAction = NewCodeAction | LintCodeAction;
export type StatusAction = SetStatusAction | ClearAction;
export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends AnyAction // known types of actions that can be dispatched
> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  NewCodeAction | LintCodeAction | SetStatusAction | ClearAction
>;
