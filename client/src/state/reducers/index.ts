import { codeReducer } from "./codeReducer";
import { combineReducers } from "redux";
import statusReducer from "./statusReducer";

const reducers = combineReducers({
  code: codeReducer,
  status: statusReducer,
});

export default reducers;
