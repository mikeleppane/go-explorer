import express from "express";
import { FormatEntry, FormatTask } from "../types";
import { validateFormatRequest } from "../validators/formatValidator";
import { readFile, rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { formatCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { validateVersion } from "../utils/route_helpers";
import { baseRouteExceptionHandler } from "../errors/routeExpectionHandler";

const formatRouter = express.Router();

const handleCodeFormatTask = async (params: FormatTask) => {
  const { tempFile, code, version, res } = params;
  await writeFile(tempFile, code, { encoding: "utf-8" });
  logger.info(`Code was successfully written to the file: ${tempFile}`);
  await run(formatCode(tempFile, version));
  const content = await readFile(tempFile);
  logger.info("Code was successfully reformatted.");
  res.status(200).send(content.toString("utf-8"));
  await rm(path.dirname(tempFile), { recursive: true, force: true });
  logger.info(`Temporary file was removed successfully.`);
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
formatRouter.post("/", async (req, res) => {
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
  logger.info(`Code formatting started with Go version ${version}.`);
  try {
    tempFile = await createTempFile();
    await handleCodeFormatTask({ tempFile, code: body.code, version, res });
  } catch (error) {
    await baseRouteExceptionHandler({ tempFile, error, res });
  }
});

export default formatRouter;
