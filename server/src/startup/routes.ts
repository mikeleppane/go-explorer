import express = require("express");
import cors = require("cors");
import infoRouter from "../routes/info";
import { morganMiddleware } from "../middleware/httpLogging";

export const setupRoutes = (app: express.Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleware);
  app.use("/api/info", infoRouter);
};
