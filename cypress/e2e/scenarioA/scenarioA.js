import {Given, When, And, Then} from "cypress-cucumber-preprocessor/steps"
import {userFirstName, userLastName, email, password, imageUrl, bio, verifyArticleTitle} from "../scenarioA/scenarioA.spec.cy.js"


Given('A home page exist and contains components', () => {
    cy.visit('/')
})

When('A user opens a home page', () => {
    cy.url().should('include','realworld')
})

Then('A user verifies header logo is diplayed', () => {
    cy.get('a').contains('conduit').should('be.visible')
})

And('A user verifies header home button is diplayed', () => {
    cy.get('a').contains('Home').should('be.visible')
})

And('A user verifies header sign in button is diplayed', () => {
    cy.get('a').contains('Sign in').should('be.visible')
})

And('A user verifies header title is diplayed', () => {
    cy.get('.banner').get('h1').should('have.text','conduit')
})

And('A user verifies header subtitle is diplayed', () => {
    cy.get('p').contains('A place to share your knowledge.').should('be.visible')
})

And('A user verifies articles are listed', () => {
    cy.get('div').should('have.class','col-md-9').and('have.length.greaterThan', 10)
})

Given('A webpage allows registering new users', () => {
    cy.visit("/")
})

When('A user clicks on Sign Up button', () => {
    cy.get('a').contains('Sign up').click()
    cy.url().should('include', '/register')
})

And('A user enters a username', () => {
    cy.get("input[placeholder=\"Username\"]").type(userFirstName + userLastName);
})

And('A user enters an email', () => {
    cy.get("input[placeholder=\"Email\"]").type(email);
})

And('A user enters a password', () => {
    cy.get("input[placeholder=\"Password\"]").type(password)
    cy.get('.btn').click()
})

Then('A user verifies proper user is created and logged in', () => {
    cy.get('.navbar').contains(userFirstName + userLastName)
})

Given('A user can log in with previously created account', () => {
    cy.visit('/')
    cy.loginToApp(email, password)
    cy.get('.navbar').contains(userFirstName + userLastName)
})

When('A user clicks on Settings option', () => {
    cy.get('.navbar').contains('Settings').click()
})

And('A user inputs users picture', () => {
    cy.get('input[placeholder="URL of profile picture"]').clear().type(imageUrl)
})

And('A user enters hisher bio', () => {
    cy.get('fieldset', {timeout: 10000}).find('textarea').clear().type(bio)
})

And('A user saves changes', () => {
    cy.get('form').submit()
})

Then('A user verifies that all previous data is properly shown', () => {
    cy.url({timeout: 10000}).should('include', userFirstName + userLastName)
    cy.get('img').invoke('attr', 'src').should('include', imageUrl)
    cy.get('p').contains(bio)
})

Given('A user is logged in to portal', () => {
    cy.visit("/")
    cy.loginToApp(email, password)
})

When('A user clicks on New Article option', () => {
    cy.get('.navbar').contains('New Article').click()
})

Then('A user can populate article data, save changes and verify new article with proper article data is created', () => {
    cy.createNewArticleAndVerify(verifyArticleTitle)
})
