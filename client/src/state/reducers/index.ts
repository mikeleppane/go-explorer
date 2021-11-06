import codeReducer from "./codeReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  code: codeReducer,
});

export default reducers;
