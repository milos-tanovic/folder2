export class ProfilePage{
    verifyProfilePageIsLoadedAfterUpdate(userFirstName, userLastName){
        return cy.url({timeout: 10000}).should('include', userFirstName + userLastName)
    }

    verifyProfilePictureIsShown(imageUrl){
        return cy.get('img').invoke('attr', 'src').should('include', imageUrl)
    }

    verifyShortBioIsShown(bio){
        return cy.get('p').contains(bio)
    }
}