export {};

describe("Visit Go Explorer App", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("front page should open", function () {
    cy.title().should("contain", "Go Explorer");
    cy.contains("Go");
    cy.contains("Explorer");
  });
  it("editor should have the default code snippet visible", function () {
    cy.get("#editor").contains("package main");
    cy.get("#editor").contains("Hello");
  });

  it("code output view should be without any content", function () {
    cy.get("#result-view").should(($el) => {
      expect($el.text().trim()).equal("");
    });
  });

  it("main tab should be selected and visible", function () {
    cy.get("#main-tab").should("be.visible");
    cy.get("#main-tab").should("not.have.css", "color", "white");
  });
});

describe("File Options", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("selecting New Template should load default code to the editor", function () {
    cy.get("#editor textarea").type("SOME CODE");
    cy.get("#editor").contains("SOME CODE");
    cy.get("#open-file-button").click();
    cy.get("#new-template").click();
    cy.get("#editor").should("not.contain", "SOME CODE");
  });
  it("should load recent changes", function () {
    cy.get("#editor textarea").type("SOME CODE");
    cy.get("#open-file-button").click();
    cy.get("#new-template").click();
    cy.get("#editor").should("not.contain", "SOME CODE");
    cy.get("#open-file-button").click();
    cy.get("#recent-changes").click();
    cy.get("#editor").contains("SOME CODE");
  });

  it("should load default code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.contains("Load From Templates");
    cy.get("#open-templates-button").click();
    cy.get("#load-default-button").click();
    cy.get("#editor").contains("Hello");
  });

  it("should load testing code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-testing-button").click();
    cy.get("#editor").contains("TestIntMinBasic");
  });

  it("should load benchmark code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-benchmark-button").click();
    cy.get("#editor").contains("BenchmarkIntMin");
  });

  it("should load concurrency code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-concurrency-button").click();
    cy.get("#editor").contains('go say("world")');
  });

  it("should load generics code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-generics-button").click();
    cy.get("#editor").contains(
      "SumIntsOrFloats[K comparable, V int64 | float64](m map[K]V) V"
    );
  });
});

describe("Run Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("should run code", function () {
    cy.get("#run-code-button").click();
    cy.get("#statusbar").contains("Wait for code execution", {
      matchCase: false,
    });
    cy.get("#statusbar", { timeout: 5000 }).contains("Code execution ok", {
      matchCase: false,
    });
    cy.get("#result-view", { timeout: 5000 }).contains("Execution time:");
    cy.get("#result-view", { timeout: 5000 }).contains("Hello");
  });
  it("generic code should execute", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-generics-button").click();
    cy.get("#run-option-button").click({ force: true });
    cy.get("#select-version-for-code").select("1.18-rc");
    cy.get("#run-code-button").click({ force: true });
    cy.get("#statusbar").contains("Wait for code execution", {
      matchCase: false,
    });
    cy.get("#statusbar", { timeout: 5000 }).contains("Code execution ok", {
      matchCase: false,
    });
    cy.get("#result-view", { timeout: 5000 }).contains("Execution time:");
    cy.get("#result-view", { timeout: 5000 }).contains("Generic Sums");
  });
});

describe("Build Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("should build code", function () {
    cy.get("#build-code-button").click();
    cy.get("#statusbar").contains("Wait for code building", {
      matchCase: false,
    });
    cy.get("#statusbar", { timeout: 5000 }).contains(
      "Code building successful",
      {
        matchCase: false,
      }
    );
    cy.get("#result-view", { timeout: 5000 }).contains("Build time:");
    cy.get("#result-view", { timeout: 5000 }).contains("Binary size:");
  });
});

describe("Test Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("user can test code", function () {
    cy.get("#open-file-button").click();
    cy.contains("Load From Templates");
    cy.get("#open-templates-button").click();
    cy.get("#load-testing-button").click();
    cy.get("#editor").contains("TestIntMinBasic");
    cy.get("#test-option-button").click({ force: true });
    cy.get("#test-flags-field").type("-v -bench=.");
    cy.get("#test-button").click({ force: true });
    cy.get("#result-view", { timeout: 10000 }).contains(
      "PASS: TestIntMinBasic",
      {
        matchCase: false,
      }
    );
  });
});

describe("Format Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("should reformat code", function () {
    for (let i = 0; i < 6; i++) {
      cy.get("#editor textarea").type("\n");
    }
    cy.get("#editor").should("contain", "15");
    cy.get("#format-code-button").click();
    cy.get("#statusbar").contains("Wait for code formatting", {
      matchCase: false,
    });
    cy.get("#statusbar", { timeout: 5000 }).contains("Code formatting ok", {
      matchCase: false,
    });
    cy.get("#editor").should("not.contain", "15");
  });
});

describe("Lint Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("should statically analyze code", function () {
    cy.get("#lint-code-button").click();
    cy.get("#statusbar").contains("Wait for static code analysis", {
      matchCase: false,
    });
    cy.get("#statusbar", { timeout: 10000 }).contains("Analysis ok", {
      matchCase: false,
    });
  });
  it("should report an error if static code analysis fails", function () {
    cy.get("#editor textarea").type("package tmp");
    cy.get("#lint-code-button").click();
    cy.get("#statusbar").contains("Wait for static code analysis", {
      matchCase: false,
    });
    cy.get("#statusbar", { timeout: 10000 }).contains(
      "Analyzer found some issues",
      {
        matchCase: false,
      }
    );
    cy.get(".errorHighlight").should("have.css", "color", "rgb(255, 0, 0)");
    cy.get("#result-view").contains("Error");
  });
});

describe("Go Explorer App Info", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("should show environment info", function () {
    cy.get("#open-env-info-button").click();
    cy.contains("Get info");
    cy.get("#get-env-info-button").click();
    cy.get("#statusbar").contains(
      "Environment information received successfully",
      {
        matchCase: false,
      }
    );
    cy.get("#result-view", { timeout: 5000 }).contains("Go ENVS");
    cy.get("#result-view", { timeout: 5000 }).contains("CPU ARCH");
  });
});

describe("Create a New Tab", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("should open a new tab", function () {
    cy.get("#new-tab").click();
    //cy.contains("CODE 1");
    cy.get("#code-tab-1").should("contain.text", "Code 1");
    cy.get("#code-tab-1").should("be.visible");
    cy.get("#code-tab-1").should("not.have.css", "color", "white");
  });
  it("should remove tab", function () {
    cy.get("#new-tab").click();
    cy.get("#clear-tab-1").click();
    cy.get(".MuiDialogActions-root > :nth-child(2)").click();
    cy.get("#code-tab-1").should("not.exist");
  });
});

describe("Visit Go Explorer App Guide", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/help");
  });
  it("application guide should open", function () {
    cy.title().should("contain", "Go Explorer");
    cy.contains("Go Explorer - Guide");
    cy.contains("Welcome to Go Explorer");
  });
});
