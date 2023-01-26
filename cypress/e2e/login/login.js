import {Given, When, And, Then} from "cypress-cucumber-preprocessor/steps"
const homeSaucePage = require ('../../support/pages/homeSaucePage')

Given('A user opens the login page', () => {
    cy.visit('/')
})

When('A user enters the username {string}', (username) => {
    homeSaucePage.typeUsername(username)
})

And('A user enters the password {string}', (password) => {
    cy.get('#password').type(password)
})

And('A user clicks on the login button', () =>{
    cy.get('#login-button').click()
})

Then('A user will be logged in', () => {
    cy.url().should('contains', '/inventory.html')
})

Then('A user will be receiving a failed message', () => {
    cy.get('h3').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
})