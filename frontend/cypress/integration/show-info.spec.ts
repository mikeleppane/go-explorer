export {};

describe("Show Info", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct tooltip while hovering over", function () {
    cy.get("#open-env-info-button").trigger("mouseover");
    cy.contains("Show info about");
  });

  it("should show environment info", function () {
    cy.get("#open-env-info-button").click();
    cy.contains("Get info");
    cy.get("#get-env-info-button").click();
    cy.get("#statusbar").contains(
      "Environment information received successfully",
      {
        matchCase: false,
      }
    );
    cy.get("#result-view", { timeout: 5000 }).contains("Go ENVS");
    cy.get("#result-view", { timeout: 5000 }).contains("CPU ARCH");
  });

  it("should send correct API request", function () {
    cy.intercept("GET", "/api/info?version=1.18-rc").as("env-info");
    cy.get("#open-env-info-button").click();
    cy.get("#select-version-for-get-info").select("1.18-rc");
    cy.get("#get-env-info-button").click();
    cy.get("@env-info").its("request.method").should("equal", "GET");
    cy.get("@env-info")
      .its("response.body.output", { timeout: 5000 })
      .should("include", "go1.18");
    cy.get("@env-info")
      .its("response.statusCode", { timeout: 5000 })
      .should("equal", 200);
  });
});
