import express from "express";
import { rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { buildCode, getObjDump } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { BuildEntry, BuildTask } from "../types";
import { parseRequestEntries, validateVersion } from "../utils/route_helpers";
import { validateBuildRequest } from "../validators/buildValidator";
import {
  handleCodeBuildOutput,
  handleObjectDumpOutput,
} from "../utils/outputFormatter";
import { baseRouteExceptionHandler } from "../errors/routeExpectionHandler";

const handleCodeBuildTask = async (params: BuildTask) => {
  const { tempFile, requestEntries, version, res, isObjectDumpRequested } =
    params;
  const { code, goos, goarch, gogc, godebug, buildFlags, symregexp } =
    requestEntries;
  await writeFile(tempFile, code, { encoding: "utf-8" });
  logger.info(`Code was successfully written to the file: ${tempFile}`);
  let responseObj;
  if (isObjectDumpRequested) {
    const output = await run(
      getObjDump(goos, goarch, buildFlags, symregexp, tempFile, version)
    );
    responseObj = handleObjectDumpOutput(output);
  } else {
    const output = await run(
      buildCode(goos, goarch, gogc, godebug, buildFlags, tempFile, version)
    );
    responseObj = handleCodeBuildOutput(output);
  }
  res.status(200).json(responseObj);
  await rm(path.dirname(tempFile), { recursive: true, force: true });
  logger.info(`Temporary file was removed successfully.`);
};

const buildRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
buildRouter.post("/", async (req, res) => {
  const body = req.body as BuildEntry;
  const { error } = validateBuildRequest(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const version = validateVersion(body.version, res);
  if (!version) {
    return;
  }
  const isObjectDumpRequested = req.query.objdump === "true";
  const requestEntries = parseRequestEntries(body);
  let tempFile = "";
  logger.info(`Code building started with GO version ${version}.`);
  try {
    tempFile = await createTempFile();
    await handleCodeBuildTask({
      tempFile,
      requestEntries,
      version,
      res,
      isObjectDumpRequested,
    });
  } catch (error) {
    await baseRouteExceptionHandler(tempFile, error, res);
  }
});

export default buildRouter;
