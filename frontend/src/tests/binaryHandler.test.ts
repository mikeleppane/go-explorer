import { defaultCode } from "../config/codeTemplates";
import { fromBinary, toBinary } from "../services/binaryHandler";

test("should decode given encoded binary", () => {
  const text2Binary = toBinary(defaultCode);
  const binary2Text = fromBinary(text2Binary);

  expect(defaultCode).toMatch(binary2Text);
});
