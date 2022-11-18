export class SignedInPage{
    verifyProperUserIsLoggedIn(userFirstName, userLastName){
        return cy.get('.navbar').contains(userFirstName + userLastName)
    }
}