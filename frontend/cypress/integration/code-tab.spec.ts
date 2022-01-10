export {};

describe("Code Tabs", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct tooltip while hovering over", function () {
    cy.get("#new-tab").trigger("mouseover");
    cy.contains("Open new tab");
  });

  it("should open a new tab", function () {
    cy.get("#new-tab").click();
    cy.get("#code-tab-1").should("contain.text", "Code 1");
    cy.get("#code-tab-1").should("be.visible");
    cy.get("#code-tab-1").should("not.have.css", "color", "white");
    cy.get("#clear-tab-1").trigger("mouseover");
    cy.contains("Close tab");
  });

  it("should remove tab", function () {
    cy.get("#new-tab").click();
    cy.get("#clear-tab-1").click();
    cy.get(".MuiDialogActions-root > :nth-child(2)").click();
    cy.get("#code-tab-1").should("not.exist");
  });

  it("should open code template to current tab", function () {
    cy.get("#new-tab").click();
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-benchmark-button").click();
    cy.get("#editor").contains("BenchmarkIntMin");
    cy.get("#main-tab").click({ force: true });
    cy.get("#editor").should("not.contain", "BenchmarkIntMin");
  });
});
