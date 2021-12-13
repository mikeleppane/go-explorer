import { rm } from "fs/promises";
import path from "path";
import logger from "../utils/logging";
import express from "express";
import { removeFirstLineFromString } from "../utils/route_helpers";

export const baseRouteExceptionHandler = async (
  tempFile: string,
  error: unknown,
  res: express.Response
) => {
  if (tempFile) {
    await rm(path.dirname(tempFile), { recursive: true, force: true });
  }
  if (error instanceof Error) {
    logger.error(error.message);
    res.status(500).json({ error: removeFirstLineFromString(error.message) });
  }
};

export const testRouteExceptionHandler = async (
  tempFile: string,
  error: unknown,
  res: express.Response
) => {
  if (tempFile) {
    await rm(path.dirname(tempFile), { recursive: true, force: true });
  }
  if (error instanceof Error) {
    logger.error(error.message);
    return res.status(500).send(error.message.trim());
  }
};
