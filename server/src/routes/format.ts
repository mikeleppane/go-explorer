import express from "express";
import { fallBackVersion, isValidVersion } from "../docker/versions";
import { FormatEntry } from "../types";
import { validateFormat } from "../validators/formatValidator";
import { readFile, rmdir, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/processExecutor";
import { formatCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";

const formatRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
formatRouter.post("/", async (req, res) => {
  const body = req.body as FormatEntry;
  const { error } = validateFormat(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let version = fallBackVersion;
  if (body.version) {
    if (isValidVersion(body.version)) {
      version = body.version;
    }
  }
  let tempFile = "";
  try {
    tempFile = await createTempFile();
    await writeFile(tempFile, body.code, { encoding: "utf-8" });
    logger.info(
      `Code snippet was successfully written to the file: ${tempFile}`
    );
    await run(formatCode(tempFile, version));
    const content = await readFile(tempFile);
    logger.info("Code snippet was successfully reformatted.");
    res.status(200).send(content);
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

export default formatRouter;
