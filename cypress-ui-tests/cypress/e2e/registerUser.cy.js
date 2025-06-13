describe("Register user", () => {
  const uniqueId = Math.floor(Math.random() * 1000);
  const navItems = "ul.nav.navbar-nav li a";
  const userName = `User_${uniqueId}`;
  const userEmail = `${userName}@testscypress.com`;
  // Avant chaque nouveau test, on revient à la page "Home".
  beforeEach(() => {
    cy.visit("/");
    // On vérifie que l'on est bien sur la page "Home" en regardant si "Home" est bien en orange dans la barre de navigation.
    cy.get(navItems)
      .contains("Home")
      .should("have.attr", "style", "color: orange;");
  });
  it("Successfully signup and deletes the user account", () => {
    // On vérifie que la barre de navigation contient bien 8 items parmi lesquels on trouve "Signup / Login" puis on clic dessus.
    cy.get(navItems)
      .should("have.length", 8)
      .contains("Signup / Login")
      .click();
    // On vérifie que l'url de redirection est le bon (doit contenir /login).
    cy.url().should("include", "/login");

    // Vérification de la présence du texte "New user signup" (insensible à la casse).
    cy.get("h2")
      .contains(/New user signup!/i)
      .should("be.visible");
    // On rempli les inputs name et email puis on clic sur "Signup".
    cy.get('[data-qa="signup-name"]').type(userName);
    cy.log(userName);
    cy.get('[data-qa="signup-email"]').type(userEmail);
    cy.log(userEmail);
    cy.get('[data-qa="signup-button"]').contains("Signup").click();

    // On vérifie que l'url de redirection est le bon (doit contenir /login).
    cy.url().should("include", "/signup");
    // On vérifie la présence du titre h2 "Enter accoutn information"
    cy.get("h2.title b").contains(/Enter account information/i);
    // On remplit les champs d'inscription
    cy.get("#id_gender1").check();
    cy.get('[data-qa="name"]').should("have.value", userName);
    cy.get('[data-qa="email"]').should("have.value", userEmail);
    cy.get('[data-qa="password"]').type("testcypress");
    cy.get('[data-qa="days"]').select("2");
    cy.get('[data-qa="months"]').type("May");
    cy.get('[data-qa="years"]').type("1965");
    cy.get('input[name="newsletter"]').should("not.be.checked");
    cy.get('input[name="optin"]').should("not.be.checked");
    cy.get("[data-qa=first_name]").type("John");
    cy.get("[data-qa=last_name]").type("Doe");
    cy.get("[data-qa=company]").type("QA Corps");
    cy.get("[data-qa=address]").type("742 Evergreen Terrace");
    cy.get("[data-qa=country]").select("United States");
    cy.get("[data-qa=state]").type("Illinois");
    cy.get("[data-qa=city]").type("Springfield");
    cy.get("[data-qa=zipcode]").type("56432");
    cy.get("[data-qa=mobile_number]").type("0102030405");
    // On clic sur "Create Account"
    cy.get("[data-qa=create-account]")
      .contains(/Create Account/i)
      .click();

    // On vérifie la redirection vers "/account_created".
    cy.url().should("include", "/account_created");
    // On vérifie le message de succès affiché.
    cy.get('[data-qa="account-created"]')
      .should("be.visible")
      .and("have.text", "Account Created!");
    cy.get('[data-qa="account-created"]')
      .next()
      .should(
        "have.text",
        "Congratulations! Your new account has been successfully created!"
      );
    cy.get('[data-qa="continue-button"]').click();
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
          `Logged in as ${userName}`
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
      .should("have.text.text", "Your account has been permanently deleted!");
    // On clic sur "Continue" puis on vérifie qu'on est bien redirigé vers la pahe d'accueil (Home").
    cy.get('[data-qa="continue-button"]').click();
    // On vérifie que la barre de navigation est bien la même que lorsque l'on est pas connecté.
    cy.get(navItems)
      .should("have.length", 8)
      .contains("Home")
      .should("have.attr", "style", "color: orange;");
  });
});
