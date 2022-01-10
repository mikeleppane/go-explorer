export {};

describe("Status Bar", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("should show clear success message after timeout", function () {
    cy.get("#open-env-info-button").click();
    cy.contains("Get info");
    cy.get("#get-env-info-button").click();
    cy.get("#statusbar").contains(
      "Environment information received successfully",
      {
        matchCase: false,
      }
    );
    cy.get("#statusbar span", { timeout: 7000 }).should("be.empty");
  });

  it("should show error message in red and clear it after timeout", function () {
    cy.get("#editor textarea").type("package tmp");
    cy.get("#lint-code-button").click();
    cy.get("#statusbar", { timeout: 10000 }).contains(
      "Analyzer found some issues",
      {
        matchCase: false,
      }
    );
    cy.get("#statusbar span", { timeout: 10000 }).should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
    cy.get("#statusbar span", { timeout: 12000 }).should("be.empty");
  });
});
