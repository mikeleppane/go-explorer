import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

const validCode = `
  package main
  import "fmt"
  func add(x int, y int) int {
    return x+y
  }
  func main() {
    fmt.Println(add(150, 5))
  }
`;

const invalidCode = `
  package main
  import "fmt"
  func add(x int, y int) int {
    return x+y
    return 0
  }
  func main() {
    fmt.Println(add(150, 5))
  }
`;

const invalidImportCode = `
  package main
  import "fmtt123"
  func add(x int, y int) int {
    return x+y
    return 0
  }
  func main() {
    fmt.Println(add(150, 5))
  }
`;

const mainPackageMissingCode = `
  import "fmt"
  func add(x int, y int) int {
    return x+y
    return 0
  }
  func main() {
    fmt.Println(add(150, 5))
  }
`;

describe("POST /api/lint", () => {
  test("should return empty if source code is valid", async () => {
    const requestBody = {
      code: validCode,
    };
    const response = await api.post("/api/lint").send(requestBody).expect(200);
    expect(response.text).toBe("");
  });
  test("should report invalid structures if source code is not valid", async () => {
    const requestBody = {
      code: invalidCode,
    };
    const response = await api.post("/api/lint").send(requestBody).expect(200);
    expect(response.text).toContain("unreachable code");
  });
  test("should report invalid import if source code import statement is not valid", async () => {
    const requestBody = {
      code: invalidImportCode,
    };
    const response = await api.post("/api/lint").send(requestBody).expect(200);
    expect(response.text).toContain("fmtt123 is not in GOROOT");
  });
  test("should report error if package statement is missing", async () => {
    const requestBody = {
      code: mainPackageMissingCode,
    };
    const response = await api.post("/api/lint").send(requestBody).expect(200);
    expect(response.text).toContain("expected 'package'");
  });
  test("should return 400 error if source code is not provided", async () => {
    const requestBody = {};
    await api.post("/api/lint").send(requestBody).expect(400);
  });
  test("should return 400 error if given version is not valid", async () => {
    const requestBody = {
      code: validCode,
      version: "0.12345",
    };
    await api.post("/api/lint").send(requestBody).expect(400);
  });
});
