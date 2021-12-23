import { exec } from "child_process";
import logger from "./logging";
import { CommandExecutionError } from "../errors/errorTypes";
import util = require("util");

const execProm = util.promisify(exec);
const bufferSize = 1024 * 1024 * 10;

export const run = async (cmd: string) => {
  try {
    const { stdout, stderr } = await execProm(cmd, {
      maxBuffer: bufferSize,
    });
    if (stderr) {
      logger.info(`stderr>: ${stderr}`);
    }
    logger.info(`${cmd} stdout> ${stdout}`);
    return { stdout, stderr };
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      throw new CommandExecutionError(`${e.message.trim()}`);
    }
    throw new CommandExecutionError(
      `Unknown error occurred while executing command (${cmd}): ${e}`
    );
  }
};
