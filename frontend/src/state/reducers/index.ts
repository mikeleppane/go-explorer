import { codeReducer } from "./codeReducer";
import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import { resultReducer } from "./resultReducer";
import { tabReducer } from "./tabReducer";

const reducers = combineReducers({
  code: codeReducer,
  output: resultReducer,
  status: statusReducer,
  tab: tabReducer,
});

export default reducers;
