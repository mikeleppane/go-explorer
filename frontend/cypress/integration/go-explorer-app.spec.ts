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
    cy.get("#open-about").click();
    cy.get("#about").contains("GO Explorer");
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
    cy.get("#statusbar").contains("Code execution ok", {
      timeout: 5000,
      matchCase: false,
    });
    cy.get("#result-view").contains("Execution time:", { timeout: 5000 });
    cy.get("#result-view").contains("Hello", { timeout: 5000 });
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
    cy.get("#result-view").contains("GO ENVS", { timeout: 5000 });
    cy.get("#result-view").contains("CPU ARCH", { timeout: 5000 });
  });
});
