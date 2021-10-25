import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200);
});

router.post("/", (_req, res) => {
  res.status(200);
});

export default router;
