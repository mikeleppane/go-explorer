export {};

describe("Run Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct button name and tooltip while hovering over", function () {
    cy.get("#run-code-button").should("have.text", "Run");
    cy.get("#run-code-button").trigger("mouseover");
    cy.contains("Run your code");
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

  it("should run code using keyboard shortcut", function () {
    cy.get("body").type("{ctrl}{alt}{Enter}");
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

  it("should have correct links for run options", function () {
    cy.get("#run-option-button").click();
    cy.get("#run-code-build-option-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
    );
    cy.get("#run-code-gogc-option-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/runtime#hdr-Environment_Variables"
    );
    cy.get("#run-code-godebug-option-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/runtime#hdr-Environment_Variables"
    );
  });

  it("should send correct API request when options are defined", function () {
    cy.get("#run-option-button").click();
    cy.get("#run-code-build-flags").type("-gcflags='-m -m'");
    cy.get("#run-code-gogc-option").type("50");
    cy.get("#run-code-godebug-option").type("gctrace=1");
    cy.get("#select-version-for-code").select("1.18-rc");
    cy.intercept("POST", "/api/run").as("run-code");
    cy.get("#run-code-button").click({ force: true });
    cy.get("@run-code").its("request.method").should("equal", "POST");
    cy.get("@run-code")
      .its("request.url")
      .should("match", /\/run$/);
    cy.get("@run-code") // yields the same interception object
      .its("request.body")
      .should("include", {
        gogc: "50",
        version: "1.18-rc",
        godebug: "gctrace=1",
        buildFlags: "-gcflags='-m -m'",
      });
    cy.get("@run-code") // yields the same interception object
      .its("request.body.code")
      .should("contain", "Hello");
    cy.get("@run-code")
      .its("response.statusCode", { timeout: 5000 })
      .should("equal", 200);
  });
});
