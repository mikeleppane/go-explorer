import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

const validCode = `
  package main;
  import (
    "fmt"
    "os"
  )
  func add(x int, y int) int {
    return x+y
  }
  func main() {
    os.Exit(1)
    fmt.Println(add(150, 5))
  }
`;

describe("POST /api/run", () => {
  test("should return correct code output and execution time", async () => {
    const requestBody = {
      code: validCode,
    };
    const response = await api.post("/api/run").send(requestBody).expect(200);
    console.log(response.body);
    expect(response.body.output).toBe("155");
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.stderr).toBeFalsy();
  });
  test("should return correct code output and execution time when gcflags='-m -m' ", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y};func main() {fmt.Println(add(150, 5))}',
      buildOptions: {
        gcflags: "-m -m",
      },
    };
    const response = await api.post("/api/run").send(requestBody).expect(200);
    expect(response.body.output).toBe("155");
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.stderr).not.toBeFalsy();
  });
  test("should return correct code output and execution time when race detector is enabled ", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func main() {done := make(chan bool);m := make(map[string]string);m["name"] = "world";go func() {m["name"] = "data race";done <- true}();fmt.Println("Hello,", m["name"]);<-done}',
      buildOptions: {
        race: "",
      },
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.stderr).toContain("WARNING: DATA RACE");
  });
  test("should return error message if incorrect build option is given", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func main() {done := make(chan bool);m := make(map[string]string);m["name"] = "world";go func() {m["name"] = "data race";done <- true}();fmt.Println("Hello,", m["name"]);<-done}',
      buildOptions: {
        gcfags: "-incorrectflag",
      },
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).toBeFalsy();
    expect(response.body.stderr).toContain("-gcfags");
  });
  test("should return 400 error if request body is not valid", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func main() {done := make(chan bool);m := make(map[string]string);m["name"] = "world";go func() {m["name"] = "data race";done <- true}();fmt.Println("Hello,", m["name"]);<-done}',
      goos: "windows",
    };
    await api.post("/api/run").send(requestBody).expect(400);
  });
  test("should return error message if build fails", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func main() {done := make(chan bool);m := make(map[string]string);m["name"] = "world";go func() {m["name"] = "data race";done <- true}();fmt.Println("Hello,", m["name"]);<-done}',
    };
    const response = await api.post("/api/run").send(requestBody);
    console.log(response.body);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).toBeFalsy();
    expect(response.body.stderr).toContain("-gcfags");
  });
  test("should return error message if incorrect build option is", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func main() {done := make(chan bool);m := make(map[string]string);m["name"] = "world";go func() {m["name"] = "data race";done <- true}();fmt.Println(Errorf("ERROR occurred"));<-done}',
    };
    const response = await api.post("/api/run").send(requestBody);
    console.log(response.body);
    // expect(response.body.output).toBeFalsy();
    // expect(response.body.executionTime).toBeFalsy();
    // expect(response.body.stderr).toContain("-gcfags");
  });
});
