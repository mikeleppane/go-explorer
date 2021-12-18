import { validateBuildRequest } from "../../validators/buildValidator";
import { validateFormatRequest } from "../../validators/formatValidator";
import { validateTestingRequest } from "../../validators/testingValidator";

describe("buildValidator", () => {
  test("Valid build data should pass from validation", () => {
    const buildData = {
      code: "some code",
      goos: "linux",
      goarch: "amd64",
      buildFlags: "some flag",
      version: "1.17",
    };
    const { error } = validateBuildRequest(buildData);
    expect(error).toBeUndefined();
  });
  test("Validator should accept development version of GO", () => {
    const buildData = {
      code: "some code",
      version: "1.18rc",
    };
    const { error } = validateBuildRequest(buildData);
    expect(error).toBeUndefined();
  });
  test("Build data with only source code specified should pass from validation", () => {
    const buildData = {
      code: "some code",
    };
    const { error } = validateBuildRequest(buildData);
    expect(error).toBeUndefined();
  });
  test("Invalid build data should not pass from validation", () => {
    const buildData = {
      goos: "linux",
      goarch: "amd64",
      buildFlags: "some flag",
      version: "1.17",
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = validateBuildRequest(buildData);
    expect(error).not.toBeUndefined();
  });
  test("unspecified field in build data should not pass from validation", () => {
    const buildData = {
      goos: "linux",
      goarch: "amd64",
      buildFlags: "some flag",
      version: "1.17",
      shouldnotbehere: "error",
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = validateBuildRequest(buildData);
    expect(error).not.toBeUndefined();
  });
  test("empty code field should not pass from validation", () => {
    const buildData = {
      code: "",
    };
    const { error } = validateBuildRequest(buildData);
    expect(error).not.toBeUndefined();
  });
  test("Invalid field should not pass from validation", () => {
    const buildData = {
      code: "some code",
      goos: 1,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = validateBuildRequest(buildData);
    expect(error).not.toBeUndefined();
  });
  test("Invalid version number should not pass from validation", () => {
    const buildData = {
      code: "some code",
      version: "t.1rc",
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = validateBuildRequest(buildData);
    expect(error).not.toBeUndefined();
  });
});

describe("formatValidator", () => {
  test("Valid format data should pass from validation", () => {
    const formatData = {
      code: "some code",
      version: "1.17",
    };
    const { error } = validateFormatRequest(formatData);
    expect(error).toBeUndefined();
  });
  test("Format data with only source code specified should pass from validation", () => {
    const formatData = {
      code: "some code",
    };
    const { error } = validateFormatRequest(formatData);
    expect(error).toBeUndefined();
  });
  test("Invalid format data should not pass from validation", () => {
    const formatData = {
      version: "1.17",
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = validateFormatRequest(formatData);
    expect(error).not.toBeUndefined();
  });
});

describe("testValidator", () => {
  test("Valid format data should pass from validation", () => {
    const formatData = {
      code: "some code",
      buildFlags: "build flag",
      testFlags: "test flag",
      version: "1.17",
    };
    const { error } = validateTestingRequest(formatData);
    expect(error).toBeUndefined();
  });
  test("Invalid format data should not pass from validation", () => {
    const formatData = {
      code: "some code",
      testFlag: "test flag",
      version: "1.17",
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = validateFormatRequest(formatData);
    expect(error).not.toBeUndefined();
  });
});
