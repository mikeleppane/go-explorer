import { getEnvInfo } from "../../docker/commands";

describe("Execution commands for Docker", () => {
  test("getEnvInfo should return correct command", () => {
    const version = "1.17";
    const command = getEnvInfo(version);
    expect(command).toBe(`docker run --rm golang:${version} go env`);
  });
});
