import { fallBackVersion, isValidVersion } from "../docker/versions";
import { BuildEntry, RunEntry } from "../types";

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

export const parseRequestEntries = (entry: RunEntry | BuildEntry) => {
  let goos = "linux";
  if (entry.goos) {
    goos = entry.goos;
  }
  let goarch = "amd64";
  if (entry.goarch) {
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
  buildOptions = buildOptions.trim();
  let symregexp = "";
  if ("symregexp" in entry && entry.symregexp) {
    symregexp = entry.symregexp;
  }
  const code = entry.code;
  return { code, goos, goarch, gogc, godebug, buildOptions, symregexp };
};
