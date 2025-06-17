import { navItems } from "../support/constants";

describe("Product page", () => {
  beforeEach(() => {
    cy.homePage();
  });
  it("Products display successfully", () => {
    // On navigue vers la page des produits (".products").
    cy.get(navItems).contains("Products").click();
    cy.url().should("include", "/products");

    // On vérifie qu'on est bien sur la page affichant tous les produits.
    cy.get(".features_items h2.title")
      .contains(/all products/i)
      .should("exist");
    cy.get(".features_items .col-sm-4")
      .its("length")
      .should("be.greaterThan", 10);
  });
  it.only("Product detail display informations", () => {
    // On navigue vers la page des produits (".products").
    cy.get(navItems).contains("Products").click();
    cy.url().should("include", "/products");
    cy.get(".features_items .col-sm-4 .choose").first().click();

    // On vérifie que toutes les information du produit sont visibles.
    cy.get(".product-information h2").should("be.visible");
    cy.get(".product-information p").should("be.visible");
    cy.get(".product-information span span").should("be.visible");
    cy.get(".product-information span #quantity").should("be.visible");
    cy.get(".product-information p")
      .nextAll()
      .eq(2)
      .should("contain.text", "In Stock");
    cy.get(".product-information p")
      .nextAll()
      .eq(3)
      .should("contain.text", "New");
    cy.get(".product-information p").nextAll().eq(4).should("be.visible");
  });
});
