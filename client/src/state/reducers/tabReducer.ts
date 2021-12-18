import { ActionType, TabAction } from "../../types";

const initialState = {
  currentTab: 0,
};

export const tabReducer = (state = initialState, action: TabAction) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_TAB:
      return { ...action.payload };
    default:
      return state;
  }
};
