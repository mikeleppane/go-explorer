import express from "express";
import { fallBackVersion, isValidVersion } from "../docker/versions";
import { rmdir, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/processExecutor";
import { buildCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { validateBuild } from "../validators/buildValidator";
import { BuildEntry } from "../types";
import { performance } from "perf_hooks";

const buildRouter = express.Router();

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
  let GCFLAGS = "";
  if (body.gcflags) {
    GCFLAGS = body.gcflags;
  }
  //const showObjdump = req.query.objdump !== undefined
  let tempFile = "";
  try {
    tempFile = await createTempFile();
    await writeFile(tempFile, body.code, { encoding: "utf-8" });
    logger.info(
      `Code snippet was successfully written to the file: ${tempFile}`
    );
    const startTime = performance.now();
    const output = await run(
      buildCode(GOOS, GOARCH, GCFLAGS, tempFile, version)
    );
    const endTime = performance.now();
    logger.info("Code snippet was successfully build.");
    res.status(200).json({ output, elapsedTime: endTime - startTime });
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
