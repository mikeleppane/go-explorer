import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

describe("GET /api/health", () => {
  test("should return ok if available", async () => {
    await api.get("/api/health").expect(200, "ok");
  });
});
