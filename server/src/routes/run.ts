import express from "express";
import { rmdir, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { runCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { validateRunRequest } from "../validators/runValidator";
import { RunEntry } from "../types";
import {
  getVersion,
  parseRequestEntries,
  validateQsVersion,
} from "../utils/route_helpers";
import { handleCodeRunOutput } from "../utils/outputFormatter";

const runRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
runRouter.post("/", async (req, res) => {
  const body = req.body as RunEntry;
  const { error } = validateRunRequest(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const version = getVersion(validateQsVersion(req.query.version));
  const { code, goos, goarch, buildOptions } = parseRequestEntries(body);
  let tempFile = "";
  try {
    tempFile = await createTempFile();
    await writeFile(tempFile, code, { encoding: "utf-8" });
    logger.info(
      `Code snippet was successfully written to the file: ${tempFile}`
    );
    const output = await run(
      runCode(goos, goarch, buildOptions, tempFile, version)
    );
    logger.info("Code snippet was successfully executed.");
    const responseObj = handleCodeRunOutput(output);
    res.status(200).json(responseObj);
    await rmdir(path.dirname(tempFile), { recursive: true });
  } catch (error) {
    if (tempFile) {
      await rmdir(path.dirname(tempFile), { recursive: true });
    }
    if (error instanceof Error) {
      logger.error(error.message);
      return res
        .status(500)
        .send(error.message.trim().split("\n").slice(1).join("\n"));
    }
  }
});

export default runRouter;
