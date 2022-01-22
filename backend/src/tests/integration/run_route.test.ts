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
  )
  func add(x int, y int) int {
    return x+y
  }
  func main() {
    fmt.Println(add(150, 5))
    fmt.Println(add(500, 500))
  }
`;

const invalidCode = `
  package main;
  import (
    "fmt"
    "os"
  )
  func add(x int, y int) int {
    return x+y
  }
  func main() {
    fmt.Println(add(150, 5))
  }
`;

const panicCode = `
  package main;
  import (
    "fmt"
  )
  func add(x int, y int) int {
    return x+y
  }
  func main() {
    panic("A problem")
    fmt.Println(add(150, 5))
  }
`;

const exitCode = `
  package main;
  import (
    "fmt"
    "os"
  )
  func add(x int, y int) int {
    return x+y
  }
  func main() {
    fmt.Println(add(150, 5))
    fmt.Println(add(500, 500))    
    os.Exit(3)
  }
`;

const concurrentCode = `
  package main
  import "fmt"
  func main() {
    done := make(chan bool)
    m := make(map[string]string)
    m["name"] = "world"
    go func() {
      m["name"] = "data race"
      done <- true
    }()
    fmt.Println("Hello,", m["name"])
    <-done
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

const cannotAccessOutsideWorld = `
  package main
  
  import (
    "fmt"
    "os/exec"
  )
  
  func main() {
    Command := fmt.Sprintf("curl www.google.com")
    output, err := exec.Command("/bin/bash", "-c", Command).Output()
    if err != nil {
        panic(err)
    }
    fmt.Println(output)
  }
`;

describe("POST /api/run", () => {
  test("should return correct code output and execution time", async () => {
    const requestBody = {
      code: validCode,
    };
    const response = await api.post("/api/run").send(requestBody).expect(200);
    expect(response.body.output).toContain("155");
    expect(response.body.output).toContain("1000");
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.error).toBeFalsy();
  });
  test("should return correct code output and execution time when gcflags='-m -m' ", async () => {
    const requestBody = {
      code: validCode,
      buildFlags: "-gcflags='-m -m'",
    };
    const response = await api.post("/api/run").send(requestBody).expect(200);
    expect(response.body.output).toContain("155");
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.error).not.toBeFalsy();
  });
  test("should return correct code output and execution time when race detector is enabled ", async () => {
    const requestBody = {
      code: concurrentCode,
      buildFlags: "-race",
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.error).toContain("WARNING: DATA RACE");
  });
  test("should return error message if incorrect build option is given", async () => {
    const requestBody = {
      code: concurrentCode,
      buildFlags: "-gcfags=incorrectflag",
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).toBeFalsy();
    expect(response.body.error).toContain("-gcfags");
  });
  test("should return 400 error if request body is not valid", async () => {
    const requestBody = {
      code: concurrentCode,
      goos: "windows",
    };
    await api.post("/api/run").send(requestBody).expect(400);
  });
  test("should return error message if build fails", async () => {
    const requestBody = {
      code: invalidCode,
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).toBeFalsy();
    expect(response.body.error).toContain("os");
  });
  test("should return error message if code is panicked", async () => {
    const requestBody = {
      code: panicCode,
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.error).toContain("A problem");
  });
  test("should return error message if code is exited", async () => {
    const requestBody = {
      code: exitCode,
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.error).toBeFalsy();
  });
  test("should report error if source code import statement is not valid", async () => {
    const requestBody = {
      code: invalidImportCode,
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).toBeFalsy();
    expect(response.body.error).not.toBeFalsy();
    expect(response.body.error).toContain("fmtt123 is not in GOROOT");
  });
  test("should report error if package statement is missing", async () => {
    const requestBody = {
      code: mainPackageMissingCode,
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).toBeFalsy();
    expect(response.body.error).not.toBeFalsy();
    expect(response.body.error).toContain("expected 'package'");
  });

  test("should not allow network access", async () => {
    const requestBody = {
      code: cannotAccessOutsideWorld,
    };
    const response = await api.post("/api/run").send(requestBody);
    expect(response.body.output).toBeFalsy();
    expect(response.body.executionTime).not.toBeFalsy();
    expect(response.body.error).not.toBeFalsy();
  });
});
