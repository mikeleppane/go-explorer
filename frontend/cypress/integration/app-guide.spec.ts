export {};

describe("Visit Go Explorer App Guide", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/help");
  });

  it("application guide should open", function () {
    cy.title().should("contain", "Go Explorer");
    cy.contains("Go Explorer - Guide");
    cy.contains("Welcome to Go Explorer");
    cy.url().should("equal", "http://localhost:3000/help");
  });
});
