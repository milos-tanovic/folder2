/// <reference types="cypress" />

const thursdaySessionData = {
    data:{
        intro: [
            {
                id: "78777",
                title: "Cypress 9",
                startsAt: "8:15",
                day: "Thursday",
                room: "New",
                level: "Starter",
                speakers: [
                    {
                        id: "2321312312",
                        name: "Adh TTT",
                        __typename: "Speaker",
                    },
                ],
                __typename: "Session",
            },
        ],
        intermediate: [
            {
                id: "78117",
                title: "Cypres1s 9",
                startsAt: "18:15",
                day: "Thursday",
                room: "New2",
                level: "Starter",
                speakers: [
                    {
                        id: "2322312",
                        name: "Adh 2TTT",
                        __typename: "Speaker",
                    },
                ],
                __typename: "Session",
            },
        ],
        advanced: [
            {
                id: "7877117",
                title: "Cypr1ess 9",
                startsAt: "8:15",
                day: "Thursday",
                room: "New3",
                level: "Starter",
                speakers: [
                    {
                        id: "234312312",
                        name: "Adh4 TTT",
                        __typename: "Speaker",
                    },
                ],
                __typename: "Session",
            },
        ]
    },
}

describe("Sessions page", () => {
    beforeEach(() => {
        cy.visit("/conference")
        cy.get("h1").contains("View Sessions").click();

        cy.url().should("include", "/sessions");

        //define aliases
        cy.dataCy("AllSessions").as("AllSessionsBtn")
        cy.dataCy("Wednesday").as("WednesdayBtn")
        cy.dataCy("Thursday").as("ThursdayBtn")
        cy.dataCy("Friday").as("FridayBtn")
    })

    it("navigate to conference sessions page  and view day filter buttons", () => {

        // Validate that buttons to filter by day exists.
        cy.get("@AllSessionsBtn")
        cy.get("@WednesdayBtn")
        cy.get("@ThursdayBtn")
        cy.get("@FridayBtn")

    })

    it("should filter sessions and only display Wednesday sessions", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionInfo")
        cy.get("@WednesdayBtn").click()
        cy.get("@AllSessionsBtn").click()
        cy.get("@WednesdayBtn").click()

        cy.wait("@getSessionInfo")

        //cy.get("[data-cy=day").should("have.length", 21)
        cy.dataCy("day").should("have.length", 21)
        cy.dataCy("day").contains("Wednesday").should("be.visible")
        cy.dataCy("day").contains("Thursday").should("not.exist")
        cy.dataCy("day").contains("Friday").should("not.exist")

    })

    it("should filter sessions and only display Thursday sessions", () => {

        //stubbing a response data
        cy.intercept("POST", "http://localhost:4000/graphql",thursdaySessionData).as("getSessionInfo")
        cy.get("@ThursdayBtn").click()
        cy.wait("@getSessionInfo")

        cy.dataCy("day").should("have.length", 3)
        cy.dataCy("day").contains("Wednesday").should("not.exist")
        cy.dataCy("day").contains("Thursday").should("be.visible")
        cy.dataCy("day").contains("Friday").should("not.exist")

    })

    it("should filter sessions and only display Friday sessions", () => {
        cy.intercept("POST", "http://localhost:4000/graphql", {fixture: "sessions.json",}).as("getSessionInfo")
        cy.get("@FridayBtn").click()
        cy.wait("@getSessionInfo")

        cy.dataCy("day").should("have.length", 4)
        cy.dataCy("day").contains("Wednesday").should("not.exist")
        cy.dataCy("day").contains("Thursday").should("not.exist")
        cy.dataCy("day").contains("Friday").should("be.visible")

    })

    it("should filter sessions and only display All Sessions sessions", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionInfo")
        cy.get("@AllSessionsBtn").click()
        cy.wait("@getSessionInfo")

        cy.dataCy("day").contains("Wednesday").should("be.visible")
        cy.dataCy("day").contains("Thursday").should("be.exist")
        cy.dataCy("day").contains("Friday").should("be.visible")

    })

})