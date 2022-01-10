export {};

describe("Visit Go Explorer App", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page should open", function () {
    cy.url().should("equal", "http://localhost:3000/");
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

  it("should open guide", function () {
    cy.get("#main-tab").should("be.visible");
    cy.get("#main-tab").should("not.have.css", "color", "white");
  });
});
