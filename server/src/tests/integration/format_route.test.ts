import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

describe("POST /api/format", () => {
  test("should return reformatted source code", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x  +  y};func main() {fmt.Println(add(150, 5))}',
    };
    const response = await api
      .post("/api/format")
      .send(requestBody)
      .expect(200);
    expect(response.text).toContain("return x + y");
  });
  test("should return 400 error if source code is not given", async () => {
    const requestBody = {
      version: "1.17",
    };
    await api.post("/api/format").send(requestBody).expect(400);
  });
  test("should return reformatted source", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x  +  y};func main() {fmt.Prin(add(150, 5))}',
    };
    const response = await api
      .post("/api/format")
      .send(requestBody)
      .expect(200);
    console.log(response.body);
  });
});
