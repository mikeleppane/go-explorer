export {};

describe("Test Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct button name and tooltip while hovering over", function () {
    cy.get("#test-button").should("have.text", "Testing");
    cy.get("#test-button").trigger("mouseover");
    cy.contains("Test your code");
  });

  it("should test code", function () {
    cy.get("#open-file-button").click();
    cy.contains("Load From Templates");
    cy.get("#open-templates-button").click();
    cy.get("#load-testing-button").click();
    cy.get("#editor").contains("TestIntMinBasic");
    cy.get("#test-option-button").click({ force: true });
    cy.get("#test-code-testing-flags").type("-v -bench=.");
    cy.get("#test-button").click({ force: true });
    cy.get("#result-view", { timeout: 10000 }).contains(
      "PASS: TestIntMinBasic",
      {
        matchCase: false,
      }
    );
  });

  it("should have correct links for test options", function () {
    cy.get("#test-option-button").trigger("mouseover");
    cy.contains("Open testing options");
    cy.get("#test-option-button").click();
    cy.get("#test-code-build-option-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
    );
    cy.get("#test-code-testing-option-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/cmd/go#hdr-Testing_flags"
    );
  });

  it("should send correct API request when testing options are defined", function () {
    cy.intercept("POST", "/api/testing").as("test-code");
    cy.get("#test-option-button").click();
    cy.get("#test-code-build-flags").type("-gcflags='-m -m'");
    cy.get("#test-code-testing-flags").type("-v -bench=.");
    cy.get("#test-button").click({ force: true });
    cy.get("@test-code").its("request.method").should("equal", "POST");
    cy.get("@test-code")
      .its("request.url")
      .should("match", /\/testing$/);
    cy.get("@test-code")
      .its("response.statusCode", { timeout: 10000 })
      .should("equal", 200);
    cy.get("@test-code") // yields the same interception object
      .its("request.body")
      .should("include", {
        buildFlags: "-gcflags='-m -m'",
        testFlags: "-v -bench=.",
      });
    cy.get("@test-code") // yields the same interception object
      .its("request.body.code")
      .should("contain", "Hello");
    cy.get("@test-code") // yields the same interception object
      .its("response.body.output", { timeout: 10000 })
      .should("contain", "PASS");
  });
});
