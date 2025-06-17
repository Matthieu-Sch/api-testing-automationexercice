// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { navItems } from "./constants";

Cypress.Commands.add("homePage", () => {
  cy.visit("/");
  // On vérifie que l'on est bien sur la page "Home" en regardant si "Home" est bien en orange dans la barre de navigation.
  cy.get(navItems)
    .contains("Home")
    .should("have.attr", "style", "color: orange;");
});

Cypress.Commands.add("register", (username, email) => {
  const navItems = "ul.nav.navbar-nav li a";

  // On vérifie que la barre de navigation contient bien 8 items parmi lesquels on trouve "Signup / Login" puis on clic dessus.
  cy.get(navItems).should("have.length", 8).contains("Signup / Login").click();
  // On vérifie que l'url de redirection est le bon (doit contenir /login).
  cy.url().should("include", "/login");

  // Vérification de la présence du texte "New user signup" (insensible à la casse).
  cy.get("h2")
    .contains(/New user signup!/i)
    .should("be.visible");
  // On rempli les inputs name et email puis on clic sur "Signup".
  cy.get('[data-qa="signup-name"]').type(username);
  cy.log(username);
  cy.get('[data-qa="signup-email"]').type(email);
  cy.log(email);
  cy.get('[data-qa="signup-button"]').contains("Signup").click();

  // On vérifie que l'url de redirection est le bon (doit contenir /login).
  cy.url().should("include", "/signup");
  // On vérifie la présence du titre h2 "Enter accoutn information"
  cy.get("h2.title b").contains(/Enter account information/i);
  // On remplit les champs d'inscription
  cy.get("#id_gender1").check();
  cy.get('[data-qa="name"]').should("have.value", username);
  cy.get('[data-qa="email"]').should("have.value", email);
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
});

Cypress.Commands.add("registerAndLogout", (username, email) => {
  cy.register(username, email);
  // On clic sur "Logout" pour se déconnecter.
  cy.get(".nav.navbar-nav li").nextAll().eq(2).click();
  //On vérifie qu'on revient bien à la navbar une fois déconnectée.
  cy.get(navItems).should("have.length", 8);
});

Cypress.Commands.add("login", () => {
  // On vérifie que la barre de navigation contient bien 8 items parmi lesquels on trouve "Signup / Login" puis on clic dessus.
  cy.get(navItems).should("have.length", 8).contains("Signup / Login").click();
  // On vérifie que le formulaire "Login" existe et est visible
  cy.get(".login-form").should("exist");

  // On remplit le formulaire avec des données valides
  cy.get("[data-qa='login-email']").type("User_973@testscypress.com");
  cy.get("[data-qa='login-password']").type("testcypress");
  cy.get("[data-qa='login-button']").click();

  cy.get(navItems)
    .contains("Home")
    .should("have.attr", "style", "color: orange;");

  // On vérifie que la barre de menu contient bien "Logged in asUser_973"
  cy.get(navItems)
    .should("have.length", 10)
    .and("contain.text", "Logged in as User_973");
});
