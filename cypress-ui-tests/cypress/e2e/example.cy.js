describe("test methods each(), map(), filter()", () => {
  it("Test map()", () => {
    cy.visit("/api_list");
    cy.get(".panel-group").should("have.length", 15);
    cy.get(".panel-group a u").then((items) => {
      const array = Array.from(items);
      const text = array.map((el) => el.innerText);
      text.forEach((title, index) => {
        cy.log("Titre avec .map() " + index + " : " + title);
      });
    });
  });
  it("Test each()", () => {
    cy.visit("/api_list");
    cy.get(".panel-group").should("have.length", 15);
    cy.get(".panel-group a u").each((title, index) => {
      cy.log("Titre avec each " + index + " : " + title.get(0).innerText);
    });
  });
  it("Test filter()", () => {
    cy.visit("/");
    cy.get(".productinfo p").then((products) => {
      const top = Array.from(products);
      const filterTop = top.filter((el) =>
        el.innerText.toLowerCase().trim().includes("top")
      );
      filterTop.forEach((el, index) => {
        cy.log(`Produit ${index + 1} : ${el.innerText}`);
      });

      cy.log(filterTop);
    });
  });
});
