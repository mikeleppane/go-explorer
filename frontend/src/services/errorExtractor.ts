import { ErrorPayload } from "../types";

// extract line and column numbers and error message from an error output
export const createErrorPayloadFromMessage = (
  errorMessage: string
): ErrorPayload[] => {
  const validLineRegexp = new RegExp(".?go:\\d+:\\d+", "i");
  const extractContentRegexp = new RegExp(/.?go:(\d+):(\d+):\s*(.+)/i);
  const errors: ErrorPayload[] = [];
  errorMessage.split("\n").map((line) => {
    if (validLineRegexp.test(line)) {
      const content = extractContentRegexp.exec(line);
      if (content) {
        errors.push({
          lineNumber: Number(content[1]),
          columnNumber: Number(content[2]),
          message: content[3],
        });
      }
    }
  });
  return errors;
};
