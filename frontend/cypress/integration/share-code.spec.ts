export {};

describe("Share code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct tooltip while hovering over", function () {
    cy.get("#share-button").trigger("mouseover");
    cy.contains("Share a link to your code");
  });

  it("should create a link from code", { browser: "electron" }, function () {
    cy.get("#share-button").click();
    cy.window()
      .its("navigator.clipboard")
      .invoke("readText")
      .should("contain", "http://localhost:3000/?share=");
    cy.contains("Success");
  });

  it(
    "should open the link created from the code",
    { browser: "electron" },
    function () {
      cy.get("#share-button").click();
      cy.window()
        .its("navigator.clipboard")
        .invoke("readText")
        .should("contain", "http://localhost:3000/?share=")
        .then((text) => {
          cy.visit(text);
          cy.url().should("contain", "http://localhost:3000/?share=");
        });
    }
  );
});
