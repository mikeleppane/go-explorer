import { availableVersions } from "../config/versions";

describe("Versions", () => {
  test("should return correct version if GOLANG_VERSIONS env is available", () => {
    const versions = availableVersions();
    const expectedVersions = ["1.17", "1.16", "1.18-rc"];

    expect(versions).toHaveLength(3);
    for (const version of expectedVersions) {
      expect(versions).toContain(version);
    }
  });
});
