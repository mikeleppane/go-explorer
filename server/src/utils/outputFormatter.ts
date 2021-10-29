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
  if (output && output.stdout) {
    const content = output.stdout.trim().split("\n");
    if (content.length > 0) {
      const assembly = content.slice(0, content.length - 1);
      if (assembly) {
        res.output = assembly.join("\n");
      }
      const size = content.pop();
      if (size) {
        res.binarySize = size;
      }
    }
  }
  if (output && output.stderr) {
    res.buildTime = output.stderr.trim().split("\n")[0] + " s";
  }
  return res;
};

export const handleCodeRunOutput = (output: CommandOutput) => {
  const res = { output: "", executionTime: "" };
  if (output && output.stdout) {
    res.output = output.stdout.trim();
  }
  if (output && output.stderr) {
    res.executionTime = output.stderr.trim().split("\n")[0] + " s";
  }
  return res;
};
