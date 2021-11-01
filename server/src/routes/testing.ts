import express from "express";
import { rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { testCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { TestingEntry } from "../types";
import {
  getVersion,
  parseRequestEntries,
  validateQsVersion,
} from "../utils/route_helpers";
import { handleCodeRunOutput } from "../utils/outputFormatter";
import { validateTestingRequest } from "../validators/testingValidator";

const testingRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
testingRouter.post("/", async (req, res) => {
  const body = req.body as TestingEntry;
  const { error } = validateTestingRequest(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const version = getVersion(validateQsVersion(req.query.version));
  const { code, gogc, godebug, buildOptions, testingOptions } =
    parseRequestEntries(body);
  let tempFile = "";
  try {
    tempFile = await createTempFile("go-", "", "_test.go");
    await writeFile(tempFile, code, { encoding: "utf-8" });
    logger.info(
      `Code snippet was successfully written to the file: ${tempFile}`
    );
    let output = { stdout: "", stderr: "" };
    try {
      output = await run(
        testCode(gogc, godebug, buildOptions, testingOptions, tempFile, version)
      );
    } catch (e) {
      console.log("ERROR: ", e);
      if (e instanceof Error) {
        output.stderr = e.message.trim().split("\n").slice(1).join("\n");
      }
    }
    console.log(output);
    logger.info("Testing command was executed successful.");
    const responseObj = handleCodeRunOutput(output);
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

export default testingRouter;
