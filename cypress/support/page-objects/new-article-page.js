export class SettingsPage{
    navigateToNewArticleCreation(){
        return cy.get('.navbar').contains('New Article').click()
    }
}