import express from "express";

const healthRouter = express.Router();

healthRouter.get("/", (_req, res) => {
  return res.status(200).send("ok");
});

export default healthRouter;
