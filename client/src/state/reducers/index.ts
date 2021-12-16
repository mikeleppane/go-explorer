import { codeReducer } from "./codeReducer";
import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import { outputReducer } from "./outputReducer";
import { tabReducer } from "./tabReducer";

const reducers = combineReducers({
  code: codeReducer,
  output: outputReducer,
  status: statusReducer,
  tab: tabReducer,
});

export default reducers;
