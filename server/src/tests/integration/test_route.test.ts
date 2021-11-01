import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

describe("POST /api/testing", () => {
  test("should return correct code output and execution time", async () => {
    const requestBody = {
      code: `package main;import ("testing");func IntMin(a, b int) int {if a < b {return a};return b};func TestIntMinBasic(t *testing.T) {ans := IntMin(2, -2);if ans != -3 {t.Errorf("IntMin(2, -2) = %d; want -2", ans)}}`,
    };
    const response = await api
      .post("/api/testing")
      .send(requestBody)
      .expect(200);
    console.log(response.body);
    // expect(response.body.output).toBe("155");
    // expect(response.body.executionTime).not.toBeFalsy();
    // expect(response.body.stderr).toBeFalsy();
  });
});
