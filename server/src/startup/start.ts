import http from "http";
import logger from "../utils/logging";
import express from "express";

const port = process.env.PORT || 5000;

export const start = (app: express.Express) => {
  const server = http.createServer(app);
  server.listen(port, () =>
    logger.info(`Listening on port ${port}...`));
};
