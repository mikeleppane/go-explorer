import { codeReducer } from "./codeReducer";
import { combineReducers } from "redux";
import { statusReducer } from "./statusReducer";
import { resultReducer } from "./resultReducer";
import { tabReducer } from "./tabReducer";
import { errorReducer } from "./errorReducer";
import { notificationReducer } from "./notificationReducer";

const reducers = combineReducers({
  code: codeReducer,
  output: resultReducer,
  status: statusReducer,
  notification: notificationReducer,
  tab: tabReducer,
  error: errorReducer,
});

export default reducers;
