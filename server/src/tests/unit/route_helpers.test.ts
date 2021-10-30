import { fallBackVersion } from "../../docker/versions";
import {
  getVersion,
  parseRequestEntries,
  validateQsVersion,
} from "../../utils/route_helpers";

describe("Versions", () => {
  test("validateQsVersion should return given string if valid", () => {
    const version = "1.17";
    expect(validateQsVersion(version)).toBe(version);
  });
  test("validateQsVersion should raise an error given string is not valid", () => {
    const version = 1;
    expect(() => validateQsVersion(version)).toThrowError(
      "Incorrect version: 1"
    );
  });
});

describe("getVersion", () => {
  test("should return given version if available", () => {
    const version = "1.16";
    expect(getVersion(version)).toBe(version);
  });
  test("should return fallback version if given version is not available", () => {
    const version = "0.123";
    expect(getVersion(version)).toBe(fallBackVersion);
  });
});

describe("parseRequestEntries", () => {
  test("should return correct code field", () => {
    const entry = {
      code: "code",
    };
    const { code } = parseRequestEntries(entry);
    expect(code).toBe("code");
  });
  test("should return correct goos field", () => {
    const entry = {
      code: "code",
      goos: "windows",
    };
    const { goos } = parseRequestEntries(entry);
    expect(goos).toBe("windows");
  });
  test("should return correct goarch field", () => {
    const entry = {
      code: "code",
    };
    const { goarch } = parseRequestEntries(entry);
    expect(goarch).toBe("amd64");
  });
  test("should return correct buildOptions field", () => {
    const entry = {
      code: "code",
      buildOptions: {
        gcflags: "-m -m -S",
        ldflags: "-s -w",
        "-race": "",
        "-v": "",
        x: "",
      },
    };
    const { buildOptions } = parseRequestEntries(entry);
    const expextedBuildCommand =
      "-gcflags '-m -m -S' -ldflags '-s -w' -race -v -x";
    expect(buildOptions).toBe(expextedBuildCommand);
  });
});
