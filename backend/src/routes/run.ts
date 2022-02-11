import express from "express";
import { rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { runCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { validateRunRequest } from "../validators/runValidator";
import { RunEntry, RunTask } from "../types";
import {
  parseRequestEntries,
  removeFirstLineFromString,
  validateVersion,
} from "../utils/route_helpers";
import { handleCodeRunOutput } from "../utils/outputFormatter";
import { baseRouteExceptionHandler } from "../errors/routeExpectionHandler";

const runRouter = express.Router();

const handleCodeRunTask = async (params: RunTask) => {
  const { tempFile, requestEntries, version, res } = params;
  const { code, gogc, godebug, buildFlags } = requestEntries;
  await writeFile(tempFile, code, { encoding: "utf-8" });
  logger.info(`Code was successfully written to the file: ${tempFile}`);
  let output = { stdout: "", stderr: "" };
  try {
    output = await run(
      runCode(tempFile, { gogc, godebug, buildFlags, version })
    );
  } catch (e) {
    if (e instanceof Error) {
      output.stderr = removeFirstLineFromString(e.message);
    }
  }
  const responseObj = handleCodeRunOutput(output);
  res.status(200).json(responseObj);
  await rm(path.dirname(tempFile), { recursive: true, force: true });
  logger.info(`Temporary file was removed successfully.`);
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
runRouter.post("/", async (req, res) => {
  const body = req.body as RunEntry;
  const { error } = validateRunRequest(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const version = validateVersion(body.version, res);
  if (!version) {
    return;
  }
  const requestEntries = parseRequestEntries(body);
  let tempFile = "";
  logger.info(`Code execution started with Go version ${version}.`);
  try {
    tempFile = await createTempFile();
    return await handleCodeRunTask({ tempFile, requestEntries, version, res });
  } catch (error) {
    await baseRouteExceptionHandler({ tempFile, error, res });
  }
});

export default runRouter;
