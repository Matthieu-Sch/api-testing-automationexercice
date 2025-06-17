describe("Register user", () => {
  const uniqueId = Math.floor(Math.random() * 1000);
  const navItems = "ul.nav.navbar-nav li a";
  const username = `User_${uniqueId}`;
  const userEmail = `${username}@testscypress.com`;
  // Avant chaque nouveau test, on revient à la page "Home".
  beforeEach(() => {
    cy.homePage();
  });
  it("Successfully signup and deletes the user account", () => {
    cy.register(username, userEmail);
    // On vérifie que l'on attérit bien sur la page "Home" en regardant si "Home" est bien en orange dans la barre de navigation.
    cy.get(navItems)
      .contains("Home")
      .should("have.attr", "style", "color: orange;");

    // On vérifie que la barre de navigation contient bien 10 items maintenat qu'on est connecté.
    cy.get(navItems)
      .should("have.length", 10)
      .invoke("text")
      .then((text) =>
        expect(text.trim().replace(/\s+/g, " ")).to.include(
          `Logged in as ${username}`
        )
      );
    // On vérifie qu'il y ai bien le bouton "Delete account" et on clic dessus.
    cy.get(navItems)
      .contains(/Delete account/i)
      .click();

    //On vérifie que l"on est redirigé vers la page de suppression "/delete_account".
    cy.url().should("include", "/delete_account");
    // On vérifie le message de succès affiché.
    cy.get('[data-qa="account-deleted"]')
      .should("be.visible")
      .and("have.text", "Account Deleted!");
    cy.get('[data-qa="account-deleted"]')
      .next()
      .should("have.text", "Your account has been permanently deleted!");
    // On clic sur "Continue" puis on vérifie qu'on est bien redirigé vers la pahe d'accueil (Home").
    cy.get('[data-qa="continue-button"]').click();
    // On vérifie que la barre de navigation est bien la même que lorsque l'on est pas connecté.
    cy.get(navItems)
      .should("have.length", 8)
      .contains("Home")
      .should("have.attr", "style", "color: orange;");
  });
  it("Register with an existing email", () => {
    // On se crée un compte pour être sûr que l'e-mail utilisé existe déjà
    cy.registerAndLogout(username, userEmail);
    // On clic sur le bouton "Signup / Login".
    cy.contains("Signup / Login").click();
    // On vérifie que la redirection est correcte
    cy.url().should("include", "/login");

    // On repaire le formulaire d'inscription
    cy.get(".signup-form h2").should("have.text", "New User Signup!");
    // On remplit les champs du formulaires
    cy.get("[data-qa='signup-name']").type(username);
    cy.log(username);
    cy.get("[data-qa='signup-email']").type(userEmail);
    cy.log(userEmail);
    cy.get("[data-qa='signup-button']").click();

    // On vérifie si le message d'erreur et visible et qu'il affiche le bon message.
    cy.get(".signup-form > form > p")
      .should("be.visible")
      .and("have.text", "Email Address already exist!");
  });
});
