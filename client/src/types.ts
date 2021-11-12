import * as React from "react";
import { store } from "./state";
import reducers from "./state/reducers";

export interface ICodeOutputViewProps {
  setPaneSize: React.Dispatch<React.SetStateAction<string>>;
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
  LOADING = "LOADING",
  STATE = "STATE",
}

interface NewCodeAction {
  type: ActionType.NEW_CODE;
  payload: string;
}

interface LintCodeAction {
  type: ActionType.LINT_CODE;
  payload: string;
}

interface LoadingAction {
  type: ActionType.LOADING;
  payload: string;
}

interface StateAction {
  type: ActionType.STATE;
  payload: string;
}

export type CodeAction =
  | NewCodeAction
  | LintCodeAction
  | LoadingAction
  | StateAction;
