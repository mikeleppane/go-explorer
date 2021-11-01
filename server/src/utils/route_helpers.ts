import { fallBackVersion, isValidVersion } from "../docker/versions";
import { RequestEntries, TestingEntry } from "../types";

export const validateQsVersion = (version: unknown): string => {
  if (version && isString(version)) {
    return version;
  }
  if (!version) {
    return "";
  }
  throw new Error(`Incorrect version: ${version}`);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

export const getVersion = (version: string) => {
  let ver = fallBackVersion;
  if (version) {
    if (isValidVersion(version)) {
      ver = version;
    }
  }
  return ver;
};

const extractBuildOptions = (entry: RequestEntries) => {
  let buildOptions = "";
  if (entry.buildOptions && Object.keys(entry.buildOptions).length > 0) {
    for (const [key, value] of Object.entries(entry.buildOptions)) {
      let option = key[0] !== "-" ? "-" + key : key;
      if (value) {
        option += ` '${value}' `;
      } else {
        option += " ";
      }
      buildOptions += option;
    }
  }
  return buildOptions.trim();
};

const extractTestingOptions = (entry: TestingEntry) => {
  let testingOptions = "";
  if (entry.testingOptions && Object.keys(entry.testingOptions).length > 0) {
    for (const [key, value] of Object.entries(entry.testingOptions)) {
      let option = key[0] !== "-" ? "-" + key : key;
      if (value) {
        option += ` '${value}' `;
      } else {
        option += " ";
      }
      testingOptions += option;
    }
  }
  return testingOptions.trim();
};

export const parseRequestEntries = (entry: RequestEntries) => {
  let goos = "";
  if ("goos" in entry && entry.goos) {
    goos = entry.goos;
  }
  let goarch = "";
  if ("goarch" in entry && entry.goarch) {
    goarch = entry.goarch;
  }
  let gogc = "";
  if (entry.gogc) {
    gogc = entry.gogc;
  }
  let godebug = "";
  if (entry.godebug) {
    godebug = entry.godebug;
  }
  const buildOptions = extractBuildOptions(entry);
  const testingOptions = extractTestingOptions(entry);
  let symregexp = "";
  if ("symregexp" in entry && entry.symregexp) {
    symregexp = entry.symregexp;
  }
  const code = entry.code;
  return {
    code,
    goos,
    goarch,
    gogc,
    godebug,
    buildOptions,
    testingOptions,
    symregexp,
  };
};
