import express from "express";
import { availableVersions } from "../docker/versions";
import { getEnvInfo } from "../docker/commands";
import { run } from "../utils/processExecutor";

const infoRouter = express.Router();
const fallBackVersion = "1.17";

infoRouter.get("/", (req, res) => {
  let version = req.query.version;
  if (!(version && availableVersions.find((item) => item === version))) {
    version = fallBackVersion;
  }
  const envInfoQuery = getEnvInfo(version as string);
  run(envInfoQuery)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

export default infoRouter;
