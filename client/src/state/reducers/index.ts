import { codeReducer } from "./codeReducer";
import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import { outputReducer } from "./outputReducer";

const reducers = combineReducers({
  code: codeReducer,
  output: outputReducer,
  status: statusReducer,
});

export default reducers;
