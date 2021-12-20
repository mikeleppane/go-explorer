import { availableVersions, fallBackVersion, isValidVersion } from "./versions";
import { RequestEntry } from "../types";
import logger from "./logging";
import express from "express";
import { VersionQueryValidationError } from "../errors/errorTypes";

export const validateQsVersion = (version: unknown): string => {
  if (version && isString(version)) {
    return version;
  }
  if (!version) {
    return "";
  }
  throw new VersionQueryValidationError(`Incorrect version: ${version}`);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

export const getVersion = (version: string | undefined) => {
  let ver = fallBackVersion;
  if (version) {
    if (isValidVersion(version)) {
      ver = version;
    } else {
      ver = "";
    }
  }
  return ver;
};

export const validateVersion = (qsVersion: unknown, res: express.Response) => {
  let version = "";
  try {
    version = getVersion(validateQsVersion(qsVersion));
    if (!version) {
      res.status(400).send(
        `No such Go version available: ${qsVersion}. 
          Currently available version are: ${availableVersions}`
      );
    }
  } catch (e) {
    if (e instanceof Error) {
      logger.error(`${e.message}`);
      res.status(500).send(e.message);
    }
  }
  return version;
};

export const parseRequestEntries = (entry: RequestEntry) => {
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

export const removeFirstLineFromString = (content: string) => {
  return content.trim().split("\n").slice(1).join("\n");
};
