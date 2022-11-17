/// <reference types="cypress" />

describe("Submit sessions", () => {
// run before each test in this describe block
    beforeEach(() => {
            cy.visit("/conference")
            cy.get("h1").contains("View Sessions").click();
            cy.url().should("include", "/sessions");
            cy.get("a").contains("Submit a Session!").click()
    })

    it("should navigate to submit sessions page", () => {
        cy.url().should("include", "/sessions/new")
    })

    it("should submit session successfully", () => {
        // Filling the form with session info
        cy.contains("Title").type("NEW TITLE FOR SESSION")
        cy.contains("Description").type("this is desc for new session")
        cy.contains("Day").type("Thursday")
        cy.contains("Level").type("Advanced XXX")

        // Submit the form
        cy.get("form").submit()

        // Validate that form is submitted successfully
        cy.contains("Session Submitted Success")
    })
})