import { ActionType, ErrorAction, ErrorPayload } from "../../types";

const initialState: ErrorPayload[] = [];

export const errorReducer = (state = initialState, action: ErrorAction) => {
  switch (action.type) {
    case ActionType.NEW_ERROR:
      return [...action.payload];
    case ActionType.CLEAR_ERROR:
      return [];
    default:
      return state;
  }
};
