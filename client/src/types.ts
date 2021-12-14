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
  CLEAR_OUTPUT = "CLEAR_OUTPUT",
  SET_STATUS = "SET_STATUS",
  CLEAR_STATUS = "CLEAR_STATUS",
  USE_DEFAULT_CODE = "USE_DEFAULT_CODE",
  LOAD_FROM_TEMPLATE = "LOAD_FROM_TEMPLATE",
  RUN_CODE = "RUN_CODE",
  BUILD_CODE = "BUILD_CODE",
  TEST_CODE = "TEST_CODE",
}

interface NewCodeAction {
  type: ActionType.NEW_CODE;
  payload: string;
}

interface NewTemplateAction {
  type: ActionType.USE_DEFAULT_CODE;
  payload: string;
}

interface LoadTemplateAction {
  type: ActionType.LOAD_FROM_TEMPLATE;
  payload: string;
}

export interface OutputActionPayload {
  output: string;
  buildTime: string;
  binarySize: string;
  executionTime: string;
  error: string;
}

export interface LintCodeAction {
  type: ActionType.LINT_CODE;
  payload: OutputActionPayload;
}

export interface RunCodeAction {
  type: ActionType.RUN_CODE;
  payload: OutputActionPayload;
}

export interface TestCodeAction {
  type: ActionType.TEST_CODE;
  payload: OutputActionPayload;
}

export interface BuildCodeAction {
  type: ActionType.BUILD_CODE;
  payload: OutputActionPayload;
}

export type RunCodeResponse = Omit<
  OutputActionPayload,
  "buildTime" | "binarySize"
>;

export type TestCodeResponse = Omit<
  OutputActionPayload,
  "buildTime" | "binarySize" | "executionTime"
>;

export type BuildCodeResponse = Omit<OutputActionPayload, "executionTime">;

export interface ClearOutputAction {
  type: ActionType.CLEAR_OUTPUT;
  payload: OutputActionPayload;
}

export interface StatusActionPayload {
  message: string;
  timeoutHandle: ReturnType<typeof setTimeout> | null;
  color: string;
}

interface SetStatusAction {
  type: ActionType.SET_STATUS;
  payload: StatusActionPayload;
}

interface ClearAction {
  type: ActionType.CLEAR_STATUS;
  payload: StatusActionPayload;
}

export type OutputAction =
  | LintCodeAction
  | ClearOutputAction
  | RunCodeAction
  | BuildCodeAction
  | TestCodeAction;

export type CodeAction = NewCodeAction | NewTemplateAction | LoadTemplateAction;
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
  OutputAction | CodeAction | StatusAction
>;
