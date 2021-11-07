import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducers from "./reducers";

export const store = createStore(reducers, devToolsEnhancer({}));
