import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

describe("POST /api/build", () => {
  test("should return correct output, binary size and build time", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y};func main() {fmt.Println(add(150, 5))}',
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("should return correct output, binary size and build time when build option is given", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y};func main() {fmt.Println(add(150, 5))}',
      buildOptions: {
        gcflags: "-m -m",
        ldflags: "-w -s",
      },
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("should return error message if build option is invalid", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y};func main() {fmt.Println(add(150, 5))}',
      buildOptions: {
        ldflags: "-nn -s",
      },
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    console.log(response.body);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).toBeFalsy();
    expect(response.body.buildTime).toBeFalsy();
  });
  test("compiler should return assembly code if requested", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y};func main() {fmt.Println(add(150, 5))}',
      buildOptions: {
        gcflags: "-S",
      },
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("compiler should return escape analysis if requested", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y};func main() {fmt.Println(add(150, 5))}',
      buildOptions: {
        gcflags: "-m -m -m",
      },
    };
    const response = await api.post("/api/build").send(requestBody).expect(200);
    expect(response.body.output).not.toBeFalsy();
    expect(response.body.binarySize).not.toBeFalsy();
    expect(response.body.buildTime).not.toBeFalsy();
  });
  test("object dump should be returned if requested", async () => {
    const requestBody = {
      code: 'package main;import "fmt";func add(x int, y int) int {return x+y};func main() {fmt.Println(add(150, 5))}',
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
});
