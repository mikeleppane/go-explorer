import express from "express";
import { getEnvInfo } from "../docker/commands";
import { run } from "../utils/commandExecutor";
import { getVersion, validateQsVersion } from "../utils/route_helpers";

const infoRouter = express.Router();

infoRouter.get("/", (req, res) => {
  const version = getVersion(validateQsVersion(req.query.version));
  const envInfoQuery = getEnvInfo(version);
  run(envInfoQuery)
    .then((response) => {
      if (response && "stdout" in response) {
        res.status(200).send(response.stdout);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send(error.message.trim().split("\n").slice(1).join("\n"));
    });
});

export default infoRouter;
