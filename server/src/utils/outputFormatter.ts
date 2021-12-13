import { CommandOutput } from "../types";

export const handleObjectDumpOutput = (output: CommandOutput) => {
  const res = { output: "", error: "" };
  if (output && output.stdout) {
    res.output = output.stdout.trim();
  }
  if (output && output.stderr) {
    const error = output.stderr.trim().split("\n");
    res.error = error.slice(1, error.length).join("\n");
  }
  return res;
};

export const handleCodeBuildOutput = (output: CommandOutput) => {
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
    return res;
  }
  if (output && output.stderr) {
    const stderr = output.stderr.trim().split("\n");
    const buildTime = stderr[stderr.length - 1];
    if (buildTimeRegExp.test(buildTime)) {
      res.buildTime = buildTime + " s";
    }
  }
  return res;
};

export const handleCodeRunOutput = (output: CommandOutput) => {
  const res = { output: "", executionTime: "", error: "" };
  const executionTimeRegExp = new RegExp("^\\d+(.\\d+)?$", "i");
  if (output && output.stdout) {
    res.output = output.stdout;
  }
  if (output && output.stderr) {
    let stderr = output.stderr.trim().split("\n");
    const executionTime = stderr[stderr.length - 1];
    if (executionTimeRegExp.test(executionTime)) {
      res.executionTime = executionTime + " s";
    }
    if (res.executionTime) {
      stderr = stderr.slice(0, stderr.length - 1);
    }
    res.error = stderr
      .map((line) => {
        if (line.includes("command-line-arguments")) {
          return "";
        }
        if (line.includes(".go")) {
          return line.replace(/([\w\d-]+\.go)/gi, "go");
        }
        return line;
      })
      .join("\n")
      .trim();
  }
  return res;
};

export const handleCodeTestOutput = (output: CommandOutput) => {
  const res = { output: "", error: "" };
  if (output && output.stdout) {
    res.output = output.stdout.trim();
  }
  if (output && output.stderr) {
    res.error = output.stderr.trim();
  }
  return res;
};

export const handleCodeLintOutput = (output: string) => {
  return output
    .split("\n")
    .map((line) => {
      if (line.includes(".go")) {
        return line.replace(/([\w\d-]+\.go)/i, "go");
      }
    })
    .join("\n")
    .trim();
};
