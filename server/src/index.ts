import express = require("express");
import logger from "./utils/logging";
import { setupRoutes } from "./startup/routes";

const app = express();
setupRoutes(app);
const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
