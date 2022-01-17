export {};

describe("Lint Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct button name and tooltip while hovering over", function () {
    cy.get("#lint-code-button").should("have.text", "Lint");
    cy.get("#lint-code-button").trigger("mouseover");
    cy.contains("Lint your code");
  });

  it.only("should statically analyze code", function () {
    cy.get("#lint-code-button").click();
    cy.get("#statusbar").contains("Wait for static code analysis", {
      matchCase: false,
    });
    cy.get("#statusbar").contains("Analysis ok", {
      matchCase: false,
      timeout: 10000,
    });
  });

  it("should report an error if static code analysis fails", function () {
    cy.get("#editor textarea").type("package tmp");
    cy.get("#lint-code-button").click();
    cy.get("#statusbar").contains("Wait for static code analysis", {
      matchCase: false,
    });
    cy.get("#statusbar").contains("Analyzer found some issues", {
      matchCase: false,
      timeout: 10000,
    });
    cy.get(".errorHighlight").should("have.css", "color", "rgb(255, 0, 0)");
    cy.get("#result-view").contains("Error");
  });

  it("should send correct API request", function () {
    cy.intercept("POST", "/api/lint").as("lint-code");
    cy.get("#lint-code-button").click();
    cy.get("@lint-code").its("request.method").should("equal", "POST");
    cy.get("@lint-code")
      .its("response.body", { timeout: 5000 })
      .should("be.empty");
    cy.get("@lint-code")
      .its("response.statusCode", { timeout: 5000 })
      .should("equal", 200);
  });
});
