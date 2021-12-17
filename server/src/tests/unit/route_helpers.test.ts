import { fallBackVersion } from "../../utils/versions";
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
  test("should return fallback version if version is not specified", () => {
    const version = undefined;
    expect(getVersion(version)).toBe(fallBackVersion);
  });
  test("should return empty if given version is not available", () => {
    const version = "0.12345";
    expect(getVersion(version)).toBe("");
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
      goarch: "amd64",
    };
    const { goarch } = parseRequestEntries(entry);
    expect(goarch).toBe("amd64");
  });
  test("should return correct gogc field", () => {
    const entry = {
      code: "code",
      gogc: "off",
    };
    const { gogc } = parseRequestEntries(entry);
    expect(gogc).toBe("off");
  });
  test("should return correct godebug field", () => {
    const entry = {
      code: "code",
      godebug: "gctrace=1",
    };
    const { godebug } = parseRequestEntries(entry);
    expect(godebug).toBe("gctrace=1");
  });
  test("should return correct buildFlags field", () => {
    const entry = {
      code: "code",
      buildFlags: "-gcflags='-m -m'",
    };
    const { buildFlags } = parseRequestEntries(entry);
    const expextedBuildFlags = "-gcflags='-m -m'";
    expect(buildFlags).toBe(expextedBuildFlags);
  });
  test("should return correct testFlags field", () => {
    const entry = {
      code: "code",
      testFlags: "-v -bench=. -count=2",
    };
    const { testFlags } = parseRequestEntries(entry);
    const expextedTestFlags = "-v -bench=. -count=2";
    expect(testFlags).toBe(expextedTestFlags);
  });
});
