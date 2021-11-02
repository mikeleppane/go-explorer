import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

const reformatRequired = `
  package main
  import "fmt"
  func add(x int, y int) int {
    return x    +    y
  }
  func main() {
    
    
    fmt.Println(                       add(150, 5))
  }
`;

describe("POST /api/format", () => {
  test("should return reformatted source code", async () => {
    const requestBody = {
      code: reformatRequired,
    };
    const response = await api
      .post("/api/format")
      .send(requestBody)
      .expect(200);
    expect(response.text).toContain("return x + y");
    expect(response.text).toContain("fmt.Println(add(150, 5))");
  });
  test("should return 400 error if source code is not given", async () => {
    const requestBody = {
      version: "1.17",
    };
    await api.post("/api/format").send(requestBody).expect(400);
  });
  test("should return 400 error if given version is not valid", async () => {
    const requestBody = {
      code: reformatRequired,
      version: "1.12345",
    };
    await api.post("/api/format").send(requestBody).expect(400);
  });
});
