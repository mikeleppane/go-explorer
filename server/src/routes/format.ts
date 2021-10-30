import express from "express";
import { FormatEntry } from "../types";
import { validateFormatRequest } from "../validators/formatValidator";
import { readFile, rm, writeFile } from "fs/promises";
import logger from "../utils/logging";
import { run } from "../utils/commandExecutor";
import { formatCode } from "../docker/commands";
import { createTempFile } from "../utils/tempfile";
import path from "path";
import { getVersion } from "../utils/route_helpers";

const formatRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
formatRouter.post("/", async (req, res) => {
  const body = req.body as FormatEntry;
  const { error } = validateFormatRequest(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const version = getVersion(req.query.version as string);
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

export default formatRouter;
