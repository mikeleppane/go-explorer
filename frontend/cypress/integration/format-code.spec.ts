export {};

describe("Format Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct button name and tooltip while hovering over", function () {
    cy.get("#format-code-button").should("have.text", "Format");
    cy.get("#format-code-button").trigger("mouseover");
    cy.contains("Format your code");
  });

  it("should reformat code", function () {
    cy.get("#editor textarea").type("\n\n\n\n\n\n");
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

  it("should send correct API request", function () {
    cy.get("#editor textarea").type("\n\n\n\n\n\n");
    cy.intercept("POST", "/api/format").as("format-code");
    cy.get("#format-code-button").click();
    cy.get("@format-code").its("request.method").should("equal", "POST");
    cy.get("@format-code")
      .its("response.body", { timeout: 5000 })
      .should("contain", "Hello");
    cy.get("@format-code")
      .its("response.statusCode", { timeout: 5000 })
      .should("equal", 200);
  });
});
