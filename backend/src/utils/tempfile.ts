import { mkdtemp, rmdir } from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import logger from "./logging";
import { TempFileCreationError } from "../errors/errorTypes";

export const createTempFile = async (
  prefix = "go-",
  dir = "",
  extension = ".go"
) => {
  let tempDir = "";
  try {
    if (!dir) {
      dir = os.tmpdir();
    }
    tempDir = await mkdtemp(path.join(dir, prefix));
    return path.join(tempDir, uuidv4() + extension);
  } catch (e) {
    if (tempDir) {
      await rmdir(tempDir, { recursive: true });
    }
    if (e instanceof Error) {
      logger.error(
        `An error occurred while creating temporary file: ${e.message}`
      );
      throw new TempFileCreationError(e.message);
    }
    throw new TempFileCreationError(`Unknown error occurred, ${e}`);
  }
};
