import express from "express";
import { getEnvInfo } from "../docker/commands";
import { run } from "../utils/commandExecutor";
import {
  removeFirstLineFromString,
  validateVersion,
} from "../utils/route_helpers";
import logger from "../utils/logging";

const infoRouter = express.Router();

infoRouter.get("/", (req, res) => {
  const version = validateVersion(req.query.version, res);
  if (!version) {
    return;
  }
  const envInfoQuery = getEnvInfo(version);
  run(envInfoQuery)
    .then((response) => {
      if (response && "stdout" in response) {
        res.status(200).json({ output: response.stdout });
        logger.info(`Environment info sent successfully; go:${version}`);
      }
    })
    .catch((error: Error) => {
      res.status(500).json({ error: removeFirstLineFromString(error.message) });
    });
});

export default infoRouter;
