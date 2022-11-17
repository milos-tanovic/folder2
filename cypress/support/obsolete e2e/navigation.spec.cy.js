/// <reference types="cypress" />

describe("Naviagtion", () => {
    it("should navigate to conference sessions page", () => {
        cy.clickViewSessions();

        cy.url().should("include", "/sessions");

    })
})