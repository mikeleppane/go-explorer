import express from "express";
import { fallBackVersion, isValidVersion } from "../docker/versions";
import { FormatEntry } from "../types";
import { validateFormat } from "../validators/formatValidator";
import tempy from "tempy";
import logger from "../utils/logging";
import fs = require("fs");

const formatRouter = express.Router();

formatRouter.post("/", (req, res) => {
  const body = req.body as FormatEntry;
  const { error } = validateFormat(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let version = fallBackVersion;
  if (body.version) {
    if (isValidVersion(body.version)) {
      version = body.version;
    }
  }
  console.log(version);
  const tempFile = tempy.file({ extension: "go" });
  fs.writeFile(tempFile, body.code, (error) => {
    if (error) {
      logger.error(``);
      return res.status(500).send(error.message);
    }
    logger.info("The content has been saved to the file.");
  });
});

export default formatRouter;
