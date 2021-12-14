import { setupRoutes } from "../../startup/routes";
import express = require("express");
import supertest = require("supertest");

const app = express();
setupRoutes(app);
const api = supertest(app);

const validCode = `
  package main;
  import (
    "testing"
  )
  func IntMin(a, b int) int {
    if a < b {
      return a;
    }
    return b
  }
  func TestIntMinBasic(t *testing.T) {
    ans := IntMin(2, -2)
    if ans != -2 {
      t.Errorf("IntMin(2, -2) = %d; want -2", ans)
    }
  }
`;

const buildTimeFailureCode = `
  package main;
  import (
    "testing"
  )
  func IntMin(a, b int) int {
    if a < b {
      return a;
    }
    return b
  }
  func TestIntMinBasic(t *testing.T) {
    ans := IntMin(2, -2)
    if ans != -2 {
      t.Erro("IntMin(2, -2) = %d; want -2", ans)
    }
  }
`;

const testCaseFailureCode = `
  package main;
  import (
    "testing"
  )
  func IntMin(a, b int) int {
    if a < b {
      return a;
    }
    return b
  }
  func TestIntMinBasic(t *testing.T) {
    ans := IntMin(2, -2)
    if ans != -3 {
      t.Errorf("IntMin(2, -2) = %d; want -2", ans)
    }
  }
`;

const executeTwoTestCases = `
  package main;
  import (
    "testing"
  )
  func IntMin(a, b int) int {
    if a < b {
      return a;
    }
    return b
  }
  func TestIntMinBasic(t *testing.T) {
    ans := IntMin(2, -2)
    if ans != -2 {
      t.Errorf("IntMin(2, -2) = %d; want -2", ans)
    }
  }
  func TestIntMinZero(t *testing.T) {
    ans := IntMin(0, 0)
    if ans != 0 {
      t.Errorf("IntMin(2, -2) = %d; want 0", ans)
    }
  }
`;

const benchmarkCode = `
  package main
  
  import (
    "testing"
  )

  func add() int {
    numbers := make([]int, 10000)
    var v int
    for _, n := range numbers {
       v += n
    }
    return v
  }

  func BenchmarkCalculate(b *testing.B) {
      for i := 0; i < b.N; i++ {
        add()
      }
  }
`;

describe("POST /api/testing", () => {
  test("should execute test code successfully", async () => {
    const requestBody = {
      code: validCode,
      buildFlags: "-gcflags='-N'",
    };
    const response = await api
      .post("/api/testing")
      .send(requestBody)
      .expect(200);
    expect(response.body.output).toContain("PASS");
    expect(response.body.error).toBeFalsy();
  });

  test("should raise error due to build time failure", async () => {
    const requestBody = {
      code: buildTimeFailureCode,
    };
    const response = await api
      .post("/api/testing")
      .send(requestBody)
      .expect(200);
    expect(response.body.output).toContain("build failed");
    expect(response.body.error).not.toBeFalsy();
  });

  test("should report failure when test case fails", async () => {
    const requestBody = {
      code: testCaseFailureCode,
    };
    const response = await api
      .post("/api/testing")
      .send(requestBody)
      .expect(200);
    expect(response.body.output).toContain("FAIL");
    expect(response.body.error).toBeFalsy();
  });

  test("should report two successful test case runs", async () => {
    const requestBody = {
      code: executeTwoTestCases,
      testFlags: "-v",
    };
    const response = await api
      .post("/api/testing")
      .send(requestBody)
      .expect(200);
    expect(response.body.output).toContain("PASS: TestIntMinBasic");
    expect(response.body.output).toContain("PASS: TestIntMinZero");
    expect(response.body.error).toBeFalsy();
  });

  test("should execute code benchmark successfully", async () => {
    const requestBody = {
      code: benchmarkCode,
      testFlags: "-v -bench=.",
    };
    const response = await api
      .post("/api/testing")
      .send(requestBody)
      .expect(200);
    expect(response.body.output).toContain("PASS");
    expect(response.body.error).toBeFalsy();
  });

  test("should return 400 error if request body is not valid", async () => {
    const requestBody = {
      code: benchmarkCode,
      testFlag: "-v -bench=.",
    };
    await api.post("/api/testing").send(requestBody).expect(400);
  });

  test("should report error if build flags is not valid", async () => {
    const requestBody = {
      code: validCode,
      buildFlags: "-gcflags='123abc'",
    };
    const response = await api
      .post("/api/testing")
      .send(requestBody)
      .expect(200);
    expect(response.body.error).not.toBeFalsy();
    expect(response.body.output).toBeFalsy();
  });
});
