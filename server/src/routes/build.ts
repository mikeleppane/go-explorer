import express from "express";
import { fallBackVersion, isValidVersion } from "../docker/versions";
import { rmdir, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/processExecutor";
import { buildCode, getObjDump } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { validateBuild } from "../validators/buildValidator";
import { BuildEntry } from "../types";

const buildRouter = express.Router();

// TODO: consider refactoring
// eslint-disable-next-line @typescript-eslint/no-misused-promises
buildRouter.post("/", async (req, res) => {
  const body = req.body as BuildEntry;
  const { error } = validateBuild(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let version = fallBackVersion;
  if (body.version) {
    if (isValidVersion(body.version)) {
      version = body.version;
    }
  }
  let GOOS = "linux";
  if (body.goos) {
    GOOS = body.goos;
  }
  let GOARCH = "amd64";
  if (body.goarch) {
    GOARCH = body.goarch;
  }
  let buildOptions = "";
  if (body.buildOptions && Object.keys(body.buildOptions).length > 0) {
    for (const [key, value] of Object.entries(body.buildOptions)) {
      let option = key[0] !== "-" ? "-" + key : key;
      option += ` '${value}' `;
      buildOptions += option;
    }
  }
  let tempFile = "";
  try {
    tempFile = await createTempFile();
    await writeFile(tempFile, body.code, { encoding: "utf-8" });
    logger.info(
      `Code snippet was successfully written to the file: ${tempFile}`
    );
    const responseObj = { output: "", binarySize: "", buildTime: "" };
    if (req.query.objdump === "true") {
      let symregexp = "";
      if (body.symregexp) {
        symregexp = body.symregexp;
      }
      const output = await run(
        getObjDump(GOOS, GOARCH, buildOptions, symregexp, tempFile, version)
      );
      if (output && output.stdout) {
        responseObj.output = output.stdout.trim();
      }
    } else {
      const output = await run(
        buildCode(GOOS, GOARCH, buildOptions, tempFile, version)
      );
      logger.info("Code snippet was successfully build.");
      if (output && output.stdout) {
        const content = output.stdout.trim().split("\n");
        if (content.length > 0) {
          const assembly = content.slice(0, content.length - 1);
          if (assembly) {
            responseObj.output = assembly.join("\n");
          }
          const size = content.pop();
          if (size) {
            responseObj.binarySize = size;
          }
        }
      }
      if (output && output.stderr) {
        responseObj.buildTime = output.stderr.trim().split("\n")[0] + " s";
      }
    }

    res.status(200).json(responseObj);
    await rmdir(path.dirname(tempFile), { recursive: true });
  } catch (error) {
    if (tempFile) {
      await rmdir(path.dirname(tempFile), { recursive: true });
    }
    if (error instanceof Error) {
      logger.error(error.message);
      return res.status(500).send(error.message);
    }
  }
});

export default buildRouter;
