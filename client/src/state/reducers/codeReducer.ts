import { ActionType, CodeAction } from "../../types";

const defaultCodeBlock = `
  // You can edit this code!
  // Click here and start typing.
  package main

  import "fmt"

  func main() {
      fmt.Println("Hello,世界")
  }
`;

export const codeReducer = (state = defaultCodeBlock, action: CodeAction) => {
  switch (action.type) {
    case ActionType.NEW_CODE:
      return action.payload;
    default:
      return state;
  }
};
