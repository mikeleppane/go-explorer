import { isValidVersion } from "../../docker/versions";

describe("available golang versions", () => {
  test("isValidVersion should return true if version is available", () => {
    const version = "1.17";
    const isValid = isValidVersion(version);
    expect(isValid).toBeTruthy();
  });
  test("isValidVersion should return false if version is not available", () => {
    const version = "0.04";
    const isValid = isValidVersion(version);
    expect(isValid).not.toBeTruthy();
  });
  test("isValidVersion should return false if version is not defined", () => {
    const version = "";
    const isValid = isValidVersion(version);
    expect(isValid).not.toBeTruthy();
  });
});
