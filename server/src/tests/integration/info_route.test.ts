import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

describe("GET /api/info", () => {
  test("should return used environment variables for default version", async () => {
    const response = await api.get("/api/info").expect(200);
    expect(response.text).toContain("go1.17");
    expect(response.text).toContain('GOOS="linux"');
  });
});
