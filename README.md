# api-testing-automationexercice
Tests API réalisés avec Postman sur le site AutomationExercice.
---------------------------------------------------------------
# API Testing – AutomationExercise.com

Ce projet présente une **batterie de tests API** réalisés avec **Postman** sur le site [automationexercise.com](https://www.automationexercise.com), utilisé comme plateforme d'entraînement au test d'API.

---

## Outils utilisés

- [Postman](https://www.postman.com/)
- Postman Collection Runner
- Tests en JavaScript (onglet "Tests")
- Environnement Postman avec variables dynamiques

---

## Objectifs du projet

- Découvrir et tester une API REST dans un cadre réaliste
- Automatiser des appels d'API avec vérifications de réponse
- Valider des scénarios courants (inscription, login, produits, etc.)
- Détecter les erreurs éventuelles dans les retours JSON ou statuts HTTP

---

## Scénarios testés

| Fonctionnalité testée         | Méthode | Endpoint                           | Statut attendu |
|------------------------------|---------|------------------------------------|----------------|
| Liste des produits           | GET     | `/api/productsList`                | 200 OK         |
| Création d’un utilisateur    | POST    | `/api/createAccount`               | 201 Created    |
| Connexion utilisateur        | POST    | `/api/verifyLogin`                 | 200 OK         |
| Suppression d’un utilisateur | DELETE  | `/api/deleteAccount`               | 200 OK         |
| Détails produit              | GET     | `/api/productDetails`              | 200 OK         |
| Catégories produits          | GET     | `/api/categories`                  | 200 OK         |

**Ajout d’assertions Postman** sur :
- Le **code HTTP** de la réponse
- Le **contenu du JSON retourné**
- Les **temps de réponse**

---

## Automatisation

- Tests organisés en **collections** : login, brands, products, users
- Utilisation de **variables globales** (email, token) pour enchaîner les appels
- Automatisation avec **Collection Runner** pour exécution en série
- Définition de **pré-requêtes** et de **scripts de test** pour vérification automatique

---

## Lancer les tests

1. Cloner le repo ou télécharger la collection `.postman_collection.json`
2. Importer la collection dans Postman
3. (Optionnel) Importer aussi un environnement Postman avec les variables
4. Exécuter avec Collection Runner ou Newman (en ligne de commande)

---

## Ce que j’ai appris

- Manipuler Postman de façon avancée
- Automatiser des scénarios de test d’API
- Lire et interpréter des réponses JSON
- Gérer des variables d’environnement et d’authentification
- Écrire des scripts de test simples en JavaScript

---

## Contact

Si vous avez des questions ou souhaitez en savoir plus, n’hésitez pas à me contacter ici ou sur LinkedIn.
