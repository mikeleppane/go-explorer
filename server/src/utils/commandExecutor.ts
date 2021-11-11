import { exec } from "child_process";
import logger from "./logging";
import { CommandExecutionError } from "../errors/errorTypes";
import util = require("util");

const execProm = util.promisify(exec);

export const run = async (cmd: string, timeout = 60000) => {
  try {
    const { stdout, stderr } = await execProm(cmd, {
      timeout,
      maxBuffer: 1024 * 10000,
    });
    if (stderr) {
      logger.info(`stderr>: ${stderr}`);
    }
    logger.info(`${cmd} stdout> ${stdout}`);
    return { stdout, stderr };
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      throw new CommandExecutionError(
        `${e.message.trim().split("\n").slice(1).join("\n")}`
      );
    }
    throw new CommandExecutionError(
      `Unknown error occurred while executing command (${cmd}): ${e}`
    );
  }
};
