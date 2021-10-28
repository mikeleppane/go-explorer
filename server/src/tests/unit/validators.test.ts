import { validateBuild } from "../../validators/buildValidator";

describe("buildValidator", () => {
  test("Valid build data should pass from validation", () => {
    const buildData = {
      code: "some code",
      goos: "linux",
      goarch: "amd64",
      buildOptions: {},
      version: "1.17",
    };
    const { error } = validateBuild(buildData);
    expect(error).toBeUndefined();
  });
  test("Build data with only source code specified should pass from validation", () => {
    const buildData = {
      code: "some code",
    };
    const { error } = validateBuild(buildData);
    expect(error).toBeUndefined();
  });
  test("Invalid build data should not pass from validation", () => {
    const buildData = {
      goos: "linux",
      goarch: "amd64",
      buildOptions: {},
      version: "1.17",
    };
    // @ts-ignore
    const { error } = validateBuild(buildData);
    expect(error).not.toBeUndefined();
  });
});

describe("formatValidator", () => {
  test("Valid format data should pass from validation", () => {
    const formatData = {
      code: "some code",
      version: "1.17",
    };
    const { error } = validateBuild(formatData);
    expect(error).toBeUndefined();
  });
  test("Format data with only source code specified should pass from validation", () => {
    const formatData = {
      code: "some code",
    };
    const { error } = validateBuild(formatData);
    expect(error).toBeUndefined();
  });
  test("Invalid format data should not pass from validation", () => {
    const formatData = {
      version: "1.17",
    };
    // @ts-ignore
    const { error } = validateBuild(formatData);
    expect(error).not.toBeUndefined();
  });
});
