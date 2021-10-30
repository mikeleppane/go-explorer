import express from "express";
import { rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { buildCode, getObjDump } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { BuildEntry } from "../types";
import {
  getVersion,
  parseRequestEntries,
  validateQsVersion,
} from "../utils/route_helpers";
import { validateBuildRequest } from "../validators/buildValidator";
import {
  handleCodeBuildOutput,
  handleObjectDumpOutput,
} from "../utils/outputFormatter";

const buildRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
buildRouter.post("/", async (req, res) => {
  const body = req.body as BuildEntry;
  const { error } = validateBuildRequest(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const version = getVersion(validateQsVersion(req.query.version));
  const { code, goos, goarch, buildOptions, symregexp } =
    parseRequestEntries(body);
  let tempFile = "";
  try {
    tempFile = await createTempFile();
    await writeFile(tempFile, code, { encoding: "utf-8" });
    logger.info(
      `Code snippet was successfully written to the file: ${tempFile}`
    );
    let responseObj;
    //let output = { stdout: "", stderr: "" };
    const isObjectDumpRequested = req.query.objdump === "true";
    if (isObjectDumpRequested) {
      const output = await run(
        getObjDump(goos, goarch, buildOptions, symregexp, tempFile, version)
      );
      responseObj = handleObjectDumpOutput(output);
    } else {
      const output = await run(
        buildCode(goos, goarch, buildOptions, tempFile, version)
      );
      logger.info("Code snippet was successfully build.");
      responseObj = handleCodeBuildOutput(output);
    }
    res.status(200).json(responseObj);
    await rm(path.dirname(tempFile), { recursive: true, force: true });
  } catch (error) {
    if (tempFile) {
      await rm(path.dirname(tempFile), { recursive: true, force: true });
    }
    if (error instanceof Error) {
      logger.error(error.message);
      return res
        .status(500)
        .send(error.message.trim().split("\n").slice(1).join("\n"));
    }
  }
});

export default buildRouter;
