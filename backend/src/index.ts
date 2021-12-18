import express = require("express");
import { setupRoutes } from "./startup/routes";
import { start } from "./startup/start";

const app = express();
setupRoutes(app);
start(app);
