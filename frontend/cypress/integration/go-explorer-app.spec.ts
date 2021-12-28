export {};

describe("Go Explorer App ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Go");
  });
  it("front page can be opened", function () {
    cy.contains("Explorer");
  });
  it("default code snippet should be visible", function () {
    cy.contains('fmt.Println("Hello,世界")');
  });
  it("user can open about", function () {
    cy.get("#open-help").click();
    cy.visit("http://localhost:3000/help");
    cy.contains("Welcome to Go Explorer");
  });
  it("user can load new template to editor", function () {
    cy.get("#open-file-button").click();
    cy.contains("Load From Templates");
    cy.get("#open-templates-button").click();
    cy.get("#load-benchmark-button").click();
    cy.get("#editor").contains("BenchmarkIntMin");
  });
  it("user can run code", function () {
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
  it("user can build code", function () {
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
  it("user can get environment info", function () {
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
