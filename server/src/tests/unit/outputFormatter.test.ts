import {
  handleCodeBuildOutput,
  handleCodeRunOutput,
  handleObjectDumpOutput,
} from "../../utils/outputFormatter";

describe("handleObjectDumpOutput", () => {
  test("should return correct result for given input", () => {
    const commandOutput = { stdout: "some output   ", stderr: "some error" };
    const expectedResultObject = {
      output: "some output",
      binarySize: "",
      buildTime: "",
    };
    expect(handleObjectDumpOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("should return correct result if stdout is empty", () => {
    const commandOutput = { stdout: "", stderr: "some error" };
    const expectedResultObject = {
      output: "",
      binarySize: "",
      buildTime: "",
    };
    expect(handleObjectDumpOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
});

describe("handleCodeBuildOutput", () => {
  test("should return correct result for given input", () => {
    const commandOutput = {
      stdout: "some output\nmoreoutput\n1.3K",
      stderr: "1.145",
    };
    const expectedResultObject = {
      output: "some output\nmoreoutput",
      binarySize: "1.3K",
      buildTime: "1.145 s",
    };
    expect(handleCodeBuildOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("should return correct result if binary size is missing", () => {
    const commandOutput = {
      stdout: "some output\nmoreoutput\neven more output\nsize\n",
      stderr: "12.1",
    };
    const expectedResultObject = {
      output: "some output\nmoreoutput\neven more output",
      binarySize: "",
      buildTime: "12.1 s",
    };
    expect(handleCodeBuildOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("should return correct result if build time is missing", () => {
    const commandOutput = {
      stdout: "some output\nmoreoutput\neven more output\n0.13M\n",
      stderr: "",
    };
    const expectedResultObject = {
      output: "some output\nmoreoutput\neven more output",
      binarySize: "0.13M",
      buildTime: "",
    };
    expect(handleCodeBuildOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("should return correct result if stdout is empty", () => {
    const commandOutput = {
      stdout: "",
      stderr: "25.145",
    };
    const expectedResultObject = {
      output: "",
      binarySize: "",
      buildTime: "25.145 s",
    };
    expect(handleCodeBuildOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("should return correct result if build time is not valid", () => {
    const commandOutput = {
      stdout: "",
      stderr: "build time",
    };
    const expectedResultObject = {
      output: "",
      binarySize: "",
      buildTime: "",
    };
    expect(handleCodeBuildOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("should return correct result if binary size is not valid", () => {
    const commandOutput = {
      stdout: "some code\n.12",
      stderr: "0.555",
    };
    const expectedResultObject = {
      output: "some code",
      binarySize: "",
      buildTime: "0.555 s",
    };
    expect(handleCodeBuildOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
});

describe("handleCodeRunOutput", () => {
  test("code run output should return correct result for given input", () => {
    const commandOutput = {
      stdout: "some output\nmoreoutput\n",
      stderr: "0.755",
    };
    const expectedResultObject = {
      output: "some output\nmoreoutput",
      executionTime: "0.755 s",
    };
    expect(handleCodeRunOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("code run output should return correct result if execution time is missing", () => {
    const commandOutput = {
      stdout: "some output\nmoreoutput\neven more output\n\n",
      stderr: "",
    };
    const expectedResultObject = {
      output: "some output\nmoreoutput\neven more output",
      executionTime: "",
    };
    expect(handleCodeRunOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("code run output should return correct result if execution time is not valid", () => {
    const commandOutput = {
      stdout: "some output\nmoreoutput\neven more output\n\n",
      stderr: "number",
    };
    const expectedResultObject = {
      output: "some output\nmoreoutput\neven more output",
      executionTime: "",
    };
    expect(handleCodeRunOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
});
