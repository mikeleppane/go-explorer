import {
  handleCodeBuildOutput,
  handleCodeRunOutput,
  handleCodeTestOutput,
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
      output: "some output\nmoreoutput\neven more output\nsize",
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
      output: "some code\n.12",
      binarySize: "",
      buildTime: "0.555 s",
    };
    expect(handleCodeBuildOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("should return correct result if binary size is only present in stdout", () => {
    const commandOutput = {
      stdout: "0.85K",
      stderr: "0.555",
    };
    const expectedResultObject = {
      output: "",
      binarySize: "0.85K",
      buildTime: "0.555 s",
    };
    expect(handleCodeBuildOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("should return correct result if binary size is not present", () => {
    const commandOutput = {
      stdout: "build failed",
      stderr: "0.555",
    };
    const expectedResultObject = {
      output: "build failed",
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
      error: "",
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
      error: "",
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
      error: "number",
    };
    expect(handleCodeRunOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("code run output should return correct result if stderr contains more data than execution time", () => {
    const commandOutput = {
      stdout: "some output\nmoreoutput\neven more output\n\n",
      stderr: "some error\n2.444",
    };
    const expectedResultObject = {
      output: "some output\nmoreoutput\neven more output",
      executionTime: "2.444 s",
      error: "some error",
    };
    expect(handleCodeRunOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
});

describe("handleCodeTestOutput", () => {
  test("code test output should return correct result for given input", () => {
    const commandOutput = {
      stdout: "test case PASS",
      stderr: "",
    };
    const expectedResultObject = {
      output: "test case PASS",
      error: "",
    };
    expect(handleCodeTestOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
  test("code test output should return correct result for given input and if error is not empty", () => {
    const commandOutput = {
      stdout: "test case FAIL\nFAIL at line 10:6",
      stderr: "some error\nbuild failed",
    };
    const expectedResultObject = {
      output: "test case FAIL\nFAIL at line 10:6",
      error: "some error\nbuild failed",
    };
    expect(handleCodeTestOutput(commandOutput)).toMatchObject(
      expectedResultObject
    );
  });
});
