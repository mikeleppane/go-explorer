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
  }
  
  func main() {
    fmt.Printl(add(150, 5))
  }
`;

describe("POST /api/build", () => {
  test("should return correct output, binary size and build time", async () => {
    const requestBody = {
      code: validCode,
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("should return correct output, binary size and build time when build flags is given", async () => {
    const requestBody = {
      code: validCode,
      buildFlags: "-gcflags='-m -m' -ldflags='-w -s'",
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("should return error message if build flags is invalid", async () => {
    const requestBody = {
      code: validCode,
      buildFlags: "-ldflags='-nn -s'",
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).toBeFalsy();
    expect(response.body.buildTime).toBeFalsy();
  });
  test("should return assembly code if requested", async () => {
    const requestBody = {
      code: validCode,
      buildFlags: "-gcflags='-S'",
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("should return escape analysis if requested", async () => {
    const requestBody = {
      code: validCode,
      buildFlags: "-gcflags='-m -m -m'",
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("debug trace should be outputted if GODEBUG is enabled", async () => {
    const requestBody = {
      code: validCode,
      godebug: "gctrace=1",
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("object dump should be returned if requested", async () => {
    const requestBody = {
      code: validCode,
      symregexp: "main.main",
    };
    const response = await api
      .post("/api/build?objdump=true")
      .send(requestBody)
      .expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).toBeFalsy();
    expect(response.body.buildTime).toBeFalsy();
  });
  test("build should fail if given GOOS is not supported", async () => {
    const requestBody = {
      code: validCode,
      goos: "newLinux",
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).toBeFalsy();
    expect(response.body.buildTime).toBeFalsy();
  });
  test("build should fail if given GOARCH is not supported", async () => {
    const requestBody = {
      code: validCode,
      goarch: "newArch",
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).toBeFalsy();
    expect(response.body.buildTime).toBeFalsy();
  });
  test("should return 400 error if request body is not valid", async () => {
    const requestBody = {
      code: validCode,
      gotool: "gctrace=1",
    };
    await api.post("/api/run").send(requestBody).expect(400);
  });
  test("should return error message if source code cannot be built", async () => {
    const requestBody = {
      code: invalidCode,
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.output).toContain("Printl");
    expect(response.body.binarySize).toBeFalsy();
    expect(response.body.buildTime).toBeFalsy();
  });
  test("should return 400 error if given source code is empty", async () => {
    const requestBody = {
      code: "",
    };
    await api.post("/api/build").send(requestBody).expect(400);
  });
});
