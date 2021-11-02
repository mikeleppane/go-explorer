import express from "express";
import { rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { testCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { TestingEntry } from "../types";
import { parseRequestEntries, validateVersion } from "../utils/route_helpers";
import { handleCodeTestOutput } from "../utils/outputFormatter";
import { validateTestingRequest } from "../validators/testingValidator";

const testingRouter = express.Router();

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
  const { code, gogc, godebug, buildFlags, testFlags } =
    parseRequestEntries(body);
  let tempFile = "";
  logger.info(`Code testing started with GO version ${version}.`);
  try {
    tempFile = await createTempFile("go-", "", "_test.go");
    await writeFile(tempFile, code, { encoding: "utf-8" });
    logger.info(`Code was successfully written to the file: ${tempFile}`);
    const output = await run(
      testCode(gogc, godebug, buildFlags, testFlags, tempFile, version)
    );
    const responseObj = handleCodeTestOutput(output);
    res.status(200).json(responseObj);
    await rm(path.dirname(tempFile), { recursive: true, force: true });
    logger.info(`Temporary file was removed successfully.`);
  } catch (error) {
    if (tempFile) {
      await rm(path.dirname(tempFile), { recursive: true, force: true });
    }
    if (error instanceof Error) {
      logger.error(error.message);
      return res.status(500).send(error.message.trim());
    }
  }
});

export default testingRouter;
