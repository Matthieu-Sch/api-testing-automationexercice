# ui-testing-automationexercice

Tests UI réalisés avec Cypress sur le site AutomationExercise.com

## UI Testing – AutomationExercise.com

Ce projet présente une série de **tests automatisés de l’interface utilisateur (UI)** à l’aide de **Cypress** sur le site [AutomationExercise.com](https://automationexercise.com), utilisé comme plateforme d'entraînement pour les tests end-to-end.

---

## Outils utilisés

- Cypress
- Mocha / Chai (intégré à Cypress)
- JavaScript (ES6)
- GitHub
- Visual Studio Code

---

## Objectifs du projet

- Tester les **fonctionnalités clés du site en condition réelle**
- **Vérifier le parcours utilisateur** : inscription, login, suppression de compte
- Tester l’accessibilité des pages, la visibilité des composants
- Manipuler le **DOM** avec Cypress et valider les comportements attendus
- **Créer des commandes personnalisées** réutilisables

---

## Scénarios testés

| Fonctionnalité testée                       | Type | Fichier Cypress                     | Résultat attendu             |
| ------------------------------------------- | ---- | ----------------------------------- | ---------------------------- |
| Inscription + suppression de compte         | UI   | `registerUser.cy.js`                | Compte créé, puis supprimé   |
| Inscription avec e-mail existant            | UI   | `registerUser.cy.js`                | Message d'erreur affiché     |
| Connexion utilisateur                       | UI   | `loginUser.cy.js`                   | Redirection vers Home        |
| Connexion + déconnexion                     | UI   | `loginUser.cy.js`                   | Session utilisateur visible  |
| Page produits & informations produit        | UI   | `productPage.cy.js`                 | Produits et détails visibles |
| Navigation et redirection                   | UI   | `navigation.cy.js` _(à venir)_      | Vérification des liens       |
| Extraction de texte sur éléments dynamiques | UI   | `extractElements.cy.js` _(à venir)_ | Titres, promotions, etc.     |

---

## Assertions automatisées

- Statut de l’URL après actions (`cy.url().should("include", "/login")`)
- Présence ou absence d’éléments (`should("be.visible")`, `should("not.exist")`)
- Valeurs dans les inputs (`should("have.value", ...)`)
- Contenus texte (`should("contain.text", ...)`)
- Couleurs ou styles CSS (`should("have.attr", "style", ...)`)

---

## Commandes personnalisées

Commandes définies dans `cypress/support/commands.js` :

- `cy.register(username, email)` : crée un compte utilisateur complet
- `cy.goToHomePage()` : navigue vers la page d’accueil et valide la couleur du menu
