import express = require("express");
import logger from "./utils/logging";
import { setupRoutes } from "./startup/routes";
import http from "http";

const app = express();
setupRoutes(app);
const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () => logger.info(`Listening on port ${port}...`));
