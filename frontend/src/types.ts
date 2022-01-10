import { store } from "./state";
import reducers from "./state/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface BaseService {
  code: string;
  version?: string;
}

export type FormatService = BaseService;
export type LintService = BaseService;

export interface BuildService extends BaseService {
  goarch?: string;
  goos?: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  symregexp?: string;
}

export interface RunService extends BaseService {
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
}

export interface TestService extends BaseService {
  buildFlags?: string;
  testFlags?: string;
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
  ENV_INFO = "ENV_INFO",
  DELETE_CODE = "DELETE_CODE",
  CHANGE_CURRENT_TAB = "CHANGE_CURRENT_TAB",
  NEW_ERROR = "NEW_ERROR",
  CLEAR_ERROR = "CLEAR_ERROR",
  SET_NOTIFICATION = "SET_NOTIFICATION",
  CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION",
}

export interface TabAction {
  type: ActionType.CHANGE_CURRENT_TAB;
  payload: { currentTab: number };
}

export interface ErrorEntry {
  lineNumber: number;
  columnNumber: number;
  message: string;
}

export type ErrorPayload = ErrorEntry;

export interface ErrorAction {
  type: ActionType.NEW_ERROR | ActionType.CLEAR_ERROR;
  payload: ErrorPayload[];
}

interface BaseCodeAction {
  type:
    | ActionType.NEW_CODE
    | ActionType.USE_DEFAULT_CODE
    | ActionType.LOAD_FROM_TEMPLATE;
  payload: { [key: string]: string };
}

export interface DeleteCodeAction {
  type: ActionType.DELETE_CODE;
  payload: number;
}

export interface ResultPayload {
  output: string;
  buildTime: string;
  binarySize: string;
  executionTime: string;
  error: string;
}

export interface ResultAction {
  type:
    | ActionType.LINT_CODE
    | ActionType.RUN_CODE
    | ActionType.TEST_CODE
    | ActionType.BUILD_CODE
    | ActionType.ENV_INFO
    | ActionType.CLEAR_OUTPUT;
  payload: ResultPayload;
}

export type RunCodeResponse = Omit<ResultPayload, "buildTime" | "binarySize">;

export type TestCodeResponse = Omit<
  ResultPayload,
  "buildTime" | "binarySize" | "executionTime"
>;

export interface EnvInfoResponse {
  output?: string;
  error?: string;
}

export type BuildCodeResponse = Omit<ResultPayload, "executionTime">;

export interface StatusPayload {
  message: string;
  timeoutHandle: ReturnType<typeof setTimeout> | null;
  color: string;
}

export interface NotificationPayload {
  message: string;
  timeoutHandle: ReturnType<typeof setTimeout> | null;
  severity: string;
}

export interface StatusAction {
  type: ActionType.SET_STATUS | ActionType.CLEAR_STATUS;
  payload: StatusPayload;
}

export interface NotificationAction {
  type: ActionType.SET_NOTIFICATION | ActionType.CLEAR_NOTIFICATION;
  payload: NotificationPayload;
}

export type CodeAction = BaseCodeAction | DeleteCodeAction;
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
  ResultAction | CodeAction | StatusAction | ErrorAction | NotificationAction
>;
