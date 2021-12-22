import { CommandExecutorOutput } from "../types";

const cleanResultOutput = (res: { output: string; error?: string }) => {
  const isCLIPrint = new RegExp("^\\s*# command-line-arguments\\s*$");
  const extractFileNameRegex = new RegExp("[-a-z0-9]+.go", "g");
  const isEmptyLine = new RegExp("^\\s*$");
  if (res.output) {
    res.output = res.output
      .split("\n")
      .map((line) => {
        if (!isCLIPrint.test(line) && !isEmptyLine.test(line)) {
          return line.replace(extractFileNameRegex, ".go");
        }
      })
      .join("\n")
      .trim();
  }
  if (res.error) {
    res.error = res.error
      .split("\n")
      .map((line) => {
        if (!isCLIPrint.test(line) && !isEmptyLine.test(line)) {
          return line.replace(extractFileNameRegex, ".go");
        }
      })
      .join("\n")
      .trim();
  }
  return res;
};

export const handleObjectDumpOutput = (output: CommandExecutorOutput) => {
  const res = { output: "", error: "" };
  if (output && output.stdout) {
    res.output = output.stdout.trim();
  }
  if (output && output.stderr) {
    const error = output.stderr.trim().split("\n");
    res.error = error.slice(1, error.length).join("\n");
  }
  return cleanResultOutput(res);
};

export const handleCodeBuildOutput = (output: CommandExecutorOutput) => {
  const res = { output: "", binarySize: "", buildTime: "", error: "" };
  const sizeRegExp = new RegExp("^\\d+(.\\d+)?\\s?[KMG]?$", "i");
  const buildTimeRegExp = new RegExp("^\\d+(.\\d+)?$", "i");
  if (output && output.stdout) {
    const content = output.stdout.trim().split("\n");
    if (content.length === 1 && sizeRegExp.test(content[0])) {
      res.binarySize = content[0];
    }
    if (content.length === 1 && !sizeRegExp.test(content[0])) {
      res.output = content[0];
    }
    if (content.length > 1) {
      const size = content[content.length - 1];
      if (size && sizeRegExp.test(size)) {
        res.binarySize = size;
      }
      if (res.binarySize) {
        res.output = content.slice(0, content.length - 1).join("\n");
      } else {
        res.output = content.join("\n");
      }
    }
  }
  if (!res.binarySize) {
    res.error = res.output;
    res.output = "";
    return cleanResultOutput(res);
  }
  if (output && output.stderr) {
    const stderr = output.stderr.trim().split("\n");
    const buildTime = stderr[stderr.length - 1];
    if (buildTimeRegExp.test(buildTime)) {
      res.buildTime = buildTime + " s";
    }
  }
  return cleanResultOutput(res);
};

export const handleCodeRunOutput = (output: CommandExecutorOutput) => {
  const res = { output: "", executionTime: "", error: "" };
  const executionTimeRegExp = new RegExp("^\\d+(.\\d+)?$", "i");
  if (output && output.stdout) {
    res.output = output.stdout;
  }
  if (output && output.stderr) {
    const stderr = output.stderr.trim().split("\n");
    const executionTime = stderr[stderr.length - 1];
    if (executionTimeRegExp.test(executionTime)) {
      res.executionTime = executionTime + " s";
    }
    if (res.executionTime) {
      res.error = stderr.slice(0, stderr.length - 1).join("\n");
    } else {
      res.error = stderr.join("\n");
    }
  }
  return cleanResultOutput(res);
};

export const handleCodeTestOutput = (output: CommandExecutorOutput) => {
  const res = { output: "", error: "" };
  if (output && output.stdout) {
    res.output = output.stdout.trim();
  }
  if (output && output.stderr) {
    res.error = output.stderr.trim();
  }
  return cleanResultOutput(res);
};

export const handleCodeLintOutput = (output: string) => {
  const res = { output: output };
  return cleanResultOutput(res).output;
};
