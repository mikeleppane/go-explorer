import * as React from "react";
import store from "./state/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
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
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface NewCodeAction {
  type: "NEW_CODE";
  payload: { code: string };
}

export type CodeAction = NewCodeAction;
