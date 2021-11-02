import express from "express";
import { FormatEntry } from "../types";
import { validateFormatRequest } from "../validators/formatValidator";
import { rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { lintCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { validateVersion } from "../utils/route_helpers";

const lintRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
lintRouter.post("/", async (req, res) => {
  const body = req.body as FormatEntry;
  const { error } = validateFormatRequest(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const version = validateVersion(body.version, res);
  if (!version) {
    return;
  }
  let tempFile = "";
  logger.info(`Linting operation started with GO version ${version}.`);
  try {
    tempFile = await createTempFile();
    await writeFile(tempFile, body.code, { encoding: "utf-8" });
    logger.info(`Code was successfully written to the file: ${tempFile}`);
    let output;
    try {
      output = await run(lintCode(tempFile, version));
    } catch (e) {
      if (e instanceof Error) {
        output = e.message.trim().split("\n").slice(1).join("\n");
      }
    }
    if (output && typeof output === "string") {
      logger.warn(`Linter found some issues: ${output}`);
      res.status(200).send(output);
    } else {
      logger.info("Linter analysis was clean.");
      res.status(200).send("");
    }
    await rm(path.dirname(tempFile), { recursive: true, force: true });
    logger.info(`Temporary file was removed successfully.`);
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

export default lintRouter;
