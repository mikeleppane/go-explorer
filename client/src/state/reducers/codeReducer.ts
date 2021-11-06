import { CodeAction } from "../../types";

const defaultCodeBlock = `
  // You can edit this code!
  // Click here and start typing.
  package main

  import "fmt"

  func main() {
      fmt.Println("Hello,世界")
  }
`;

const codeReducer = (state = defaultCodeBlock, action: CodeAction) => {
  switch (action.type) {
    case "NEW_CODE":
      return action.payload;
    default:
      return state;
  }
};

export default codeReducer;
