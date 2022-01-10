export {};

describe("Build Code", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should show correct button name and tooltip while hovering over", function () {
    cy.get("#build-code-button").should("have.text", "Build");
    cy.get("#build-code-button").trigger("mouseover");
    cy.contains("Build your code");
  });

  it("should build code", function () {
    cy.get("#build-code-button").click();
    cy.get("#statusbar").contains("Wait for code building", {
      matchCase: false,
    });
    cy.get("#statusbar", { timeout: 5000 }).contains(
      "Code building successful",
      {
        matchCase: false,
      }
    );
    cy.get("#result-view", { timeout: 5000 }).contains("Build time:");
    cy.get("#result-view", { timeout: 5000 }).contains("Binary size:");
  });

  it("should have correct links for build options", function () {
    cy.get("#build-code-option-button").click();
    cy.get("#build-code-build-flags-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
    );
    cy.get("#build-code-gogc-option-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/runtime#hdr-Environment_Variables"
    );
    cy.get("#build-code-godebug-option-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/runtime#hdr-Environment_Variables"
    );
    cy.get("#build-code-goarch-option-link").should(
      "have.attr",
      "href",
      "https://go.dev/doc/install/source#environment"
    );
    cy.get("#build-code-goos-option-link").should(
      "have.attr",
      "href",
      "https://go.dev/doc/install/source#environment"
    );
    cy.get("#objDump-option-link").should(
      "have.attr",
      "href",
      "https://pkg.go.dev/cmd/objdump#pkg-overview"
    );
  });

  it("should send correct API request when options are defined", function () {
    cy.get("#build-code-option-button").click();
    cy.get("#build-code-build-flags").type("-gcflags='-m -m'");
    cy.get("#build-code-gogc-option").type("50");
    cy.get("#build-code-godebug-option").type("gctrace=1");
    cy.get("#build-code-goarch-option").type("amd64");
    cy.get("#build-code-goos-option").type("linux");
    cy.get("#select-version-for-code-build").select("1.18-rc");
    cy.get("#objDump-checkbox").check();
    cy.intercept("POST", "/api/build?objdump=true").as("build-code");
    cy.get("#build-code-button").click({ force: true });
    cy.get("@build-code")
      .its("response.statusCode", { timeout: 20000 })
      .should("equal", 200);
    cy.get("@build-code").its("request.method").should("equal", "POST");
    cy.get("@build-code")
      .its("request.url")
      .should("match", /http:\/\/localhost:5000\/api\/build\?objdump=true/);
    cy.get("@build-code").its("request.body").should("include", {
      gogc: "50",
      version: "1.18-rc",
      godebug: "gctrace=1",
      goos: "linux",
      goarch: "amd64",
      buildFlags: "-gcflags='-m -m'",
    });
    cy.get("@build-code").its("response.body.output").should("not.be.empty");
  });
});
