import { CommandOutput } from "../types";

export const handleObjectDumpOutput = (output: CommandOutput) => {
  const res = { output: "", binarySize: "", buildTime: "" };
  if (output && output.stdout) {
    res.output = output.stdout.trim();
  }
  return res;
};

export const handleCodeBuildOutput = (output: CommandOutput) => {
  const res = { output: "", binarySize: "", buildTime: "" };
  const sizeRegExp = new RegExp("^\\d+(.\\d+)?\\s?[KMG]?$", "i");
  const buildTimeRegExp = new RegExp("^\\d+(.\\d+)?$", "i");
  if (output && output.stdout) {
    const content = output.stdout.trim().split("\n");
    if (content.length > 0) {
      const assembly = content.slice(0, content.length - 1);
      if (assembly) {
        res.output = assembly.join("\n");
      }
      const size = content.pop();
      if (size && sizeRegExp.test(size)) {
        res.binarySize = size;
      }
    }
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
  const res = { output: "", executionTime: "", stderr: "" };
  const executionTimeRegExp = new RegExp("^\\d+(.\\d+)?$", "i");
  if (output && output.stdout) {
    res.output = output.stdout.trim();
  }
  if (output && output.stderr) {
    const stderr = output.stderr.trim().split("\n");
    const executionTime = stderr[stderr.length - 1];
    if (executionTimeRegExp.test(executionTime)) {
      res.executionTime = executionTime + " s";
    }
    if (stderr.length > 1) {
      res.stderr = stderr.slice(0, stderr.length - 1).join("\n");
    }
  }
  return res;
};
