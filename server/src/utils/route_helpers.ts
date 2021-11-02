import { fallBackVersion, isValidVersion } from "../docker/versions";
import { RequestEntries } from "../types";

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
  let buildFlags = "";
  if (entry.buildFlags) {
    buildFlags = entry.buildFlags;
  }
  let testFlags = "";
  if ("testFlags" in entry && entry.testFlags) {
    testFlags = entry.testFlags;
  }
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
    buildFlags,
    testFlags,
    symregexp,
  };
};
