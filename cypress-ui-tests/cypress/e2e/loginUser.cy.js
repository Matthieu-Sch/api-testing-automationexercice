describe("Login user", () => {
  beforeEach(() => {
    cy.homePage();
  });
  it("Login with valid email and password", () => {
    cy.login();
  });
  it("Login and logout successfully", () => {
    cy.login();
    cy.get("ul.nav.navbar-nav li")
      .nextAll()
      .eq(2)
      .should("contain.text", "Logout");

    cy.get("ul.nav.navbar-nav li").nextAll().eq(2).click();

    cy.url().should("include", "/login");
  });
});
