import { exec } from "child_process";
import logger from "./logging";
import util = require("util");

const execProm = util.promisify(exec);

export const run = async (cmd: string, timeout = 60000) => {
  try {
    const { stdout, stderr } = await execProm(cmd, { timeout });
    if (stderr) {
      logger.error(`stderr: ${stderr}`);
    }
    return stdout;
  } catch (e) {
    if (e instanceof Error) {
      logger.error(`${e.name}: ${e.message}`);
      throw new Error(`${e.name}: ${e.message}`);
    }
  }
};
