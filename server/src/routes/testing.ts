import express from "express";
import { rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { testCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { CodeExecutionEntry, TestingEntry } from "../types";
import { parseRequestEntries, validateVersion } from "../utils/route_helpers";
import { handleCodeTestOutput } from "../utils/outputFormatter";
import { validateTestingRequest } from "../validators/testingValidator";
import { testRouteExceptionHandler } from "../errors/routeExpectionHandler";

const testingRouter = express.Router();

const handleCodeTestTask = async (
  tempFile: string,
  requestEntries: CodeExecutionEntry,
  version: string,
  res: express.Response
) => {
  const { code, gogc, godebug, buildFlags, testFlags } = requestEntries;
  await writeFile(tempFile, code, { encoding: "utf-8" });
  logger.info(`Code was successfully written to the file: ${tempFile}`);
  const output = await run(
    testCode(gogc, godebug, buildFlags, testFlags, tempFile, version)
  );
  const responseObj = handleCodeTestOutput(output);
  res.status(200).json(responseObj);
  await rm(path.dirname(tempFile), { recursive: true, force: true });
  logger.info(`Temporary file was removed successfully.`);
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
testingRouter.post("/", async (req, res) => {
  const body = req.body as TestingEntry;
  const { error } = validateTestingRequest(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const version = validateVersion(body.version, res);
  if (!version) {
    return;
  }
  const requestEntries = parseRequestEntries(body);
  let tempFile = "";
  logger.info(`Code testing started with GO version ${version}.`);
  try {
    tempFile = await createTempFile("go-", "", "_test.go");
    await handleCodeTestTask(tempFile, requestEntries, version, res);
  } catch (error) {
    await testRouteExceptionHandler(tempFile, error, res);
  }
});

export default testingRouter;
