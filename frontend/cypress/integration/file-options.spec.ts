export {};

describe("File Options", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct button name and tooltip while hovering over", function () {
    cy.get("#open-file-button").should("have.text", "File");
    cy.get("#open-file-button").trigger("mouseover");
    cy.contains("Open file options");
  });

  it("selecting New Template should load default code to the editor", function () {
    cy.get("#editor textarea").type("SOME CODE");
    cy.get("#editor").contains("SOME CODE");
    cy.get("#open-file-button").click();
    cy.get("#new-template").click();
    cy.get("#editor").should("not.contain", "SOME CODE");
  });

  it("should load recent changes", function () {
    cy.get("#editor textarea").type("SOME CODE");
    cy.get("#open-file-button").click();
    cy.get("#new-template").click();
    cy.get("#editor").should("not.contain", "SOME CODE");
    cy.get("#open-file-button").click();
    cy.get("#recent-changes").click();
    cy.get("#editor").contains("SOME CODE");
  });

  it("should load default code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.contains("Load From Templates");
    cy.get("#open-templates-button").click();
    cy.get("#load-default-button").click();
    cy.get("#editor").contains("Hello");
  });

  it("should load testing code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-testing-button").click();
    cy.get("#editor").contains("TestIntMinBasic");
  });

  it("should load benchmark code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-benchmark-button").click();
    cy.get("#editor").contains("BenchmarkIntMin");
  });

  it("should load concurrency code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-concurrency-button").click();
    cy.get("#editor").contains('go say("world")');
  });

  it("should load generics code to the editor when selected from templates", function () {
    cy.get("#open-file-button").click();
    cy.get("#open-templates-button").click();
    cy.get("#load-generics-button").click();
    cy.get("#editor").contains(
      "SumIntsOrFloats[K comparable, V int64 | float64](m map[K]V) V"
    );
  });

  it(
    "should copy the current code from editor to clipboard",
    { browser: "electron" },
    function () {
      cy.get("#editor textarea").type("SOME CODE");
      cy.get("#editor").contains("SOME CODE");
      cy.get("#open-file-button").click();
      cy.get("#copy-to-clipboard-button").click();
      cy.window()
        .its("navigator.clipboard")
        .invoke("readText")
        .should("contain", "SOME CODE");
      cy.contains("Success");
    }
  );
});
