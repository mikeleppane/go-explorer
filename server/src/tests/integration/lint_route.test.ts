import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

describe("POST /api/lint", () => {
  test("should return empty if source code is valid", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y};func main() {fmt.Println(add(150, 5))}',
    };
    const response = await api.post("/api/lint").send(requestBody).expect(200);
    expect(response.text).toBe("");
  });
  test("should report invalid structures if source code is not valid", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y; return 0};func main() {fmt.Println(add(150, 5))}',
    };
    const response = await api.post("/api/lint").send(requestBody).expect(200);
    expect(response.text).toContain("unreachable code");
  });
  test("should return 400 error if source code is not provided", async () => {
    const requestBody = {};
    await api.post("/api/lint").send(requestBody).expect(400);
  });
});
