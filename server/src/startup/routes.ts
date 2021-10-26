import express = require("express");
import cors = require("cors");
import infoRouter from "../routes/info";
import formatRouter from "../routes/format";
import { morganMiddleware } from "../middleware/httpLogging";
import healthRouter from "../routes/health";
import lintRouter from "../routes/lint";
import buildRouter from "../routes/build";

export const setupRoutes = (app: express.Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleware);
  app.use("/api/info", infoRouter);
  app.use("/api/format", formatRouter);
  app.use("/api/lint", lintRouter);
  app.use("/api/build", buildRouter);
  app.use("/api/health", healthRouter);
};
