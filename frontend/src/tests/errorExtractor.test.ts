import { createErrorPayloadFromMessage } from "../services/errorExtractor";
import { ErrorPayload } from "../types";

describe("ErrorExtractor", () => {
  test("should create correct error objects", () => {
    const expectedErrors = [
      { lineNumber: 4, columnNumber: 3, message: "found some error" },
      { lineNumber: 15, columnNumber: 55, message: "found 4 errors" },
    ];
    const errorMessage =
      "from go vet 1234-abcd.go:4:3: found some error\nfrom go vet abc123.go:15:55: found 4 errors\n";
    const errors = createErrorPayloadFromMessage(errorMessage);

    expect(errors).toHaveLength(2);
    expect(errors).toMatchObject(expectedErrors);
  });

  test("should return empty array if no correct errors are found", () => {
    const expectedErrors: ErrorPayload[] = [];
    const errorMessage = `
  from go vet found some error\n
  from go vet 15:55: found 4 errors\n
  `;
    const errors = createErrorPayloadFromMessage(errorMessage);

    expect(errors).toHaveLength(0);
    expect(errors).toMatchObject(expectedErrors);
  });
});
