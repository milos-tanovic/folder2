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

// custom command to get an element usign the data-cy attribute

Cypress.Commands.add("dataCy", (value) => {
    return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add("clickViewSessions", () => {
    cy.visit("/conference")
    cy.get("h1").contains("View Sessions").click();
});

Cypress.Commands.add("loginToApp", (email, password) => {
    cy.get('a').contains('Sign in').should('be.visible').click()

    cy.get("input[placeholder=\"Email\"]").type(email);  //
    cy.get("input[placeholder=\"Password\"]").type(password); //
    cy.get('.btn').click()
});

Cypress.Commands.add("registerNewUser", (email, password, userFirstName, userLastName) => {
    cy.get('a').contains('Sign up').click()
    cy.url().should('include', '/register')
    cy.get("input[placeholder=\"Username\"]").type(userFirstName + userLastName);
    cy.get("input[placeholder=\"Email\"]").type(email);
    cy.get("input[placeholder=\"Password\"]").type(password);
    cy.get('.btn').click()
});

Cypress.Commands.add("navigateToHomePage", () => {
    cy.visit("/")
});

Cypress.Commands.add("editUserSettings", (imageUrl, bio) => {
    cy.get('.navbar').contains('Settings').click()
    cy.get('input[placeholder="URL of profile picture"]').clear().type(imageUrl)
    cy.get('fieldset').find('textarea').clear().type(bio)
});