import { exec } from "child_process";
import logger from "./logging";
import util = require("util");

const execProm = util.promisify(exec);

export const run = async (cmd: string, timeout = 60000) => {
  try {
    const { stdout, stderr } = await execProm(cmd, {
      timeout,
      maxBuffer: 1024 * 10000,
    });
    if (stderr) {
      logger.error(`stderr: ${stderr}`);
    }
    console.log("STDOUT: ", stdout);
    return { stdout, stderr };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`${e.name}: ${e.message}`);
    }
    throw new Error(`Run command: Unknown error occurred ${e}`);
  }
};
