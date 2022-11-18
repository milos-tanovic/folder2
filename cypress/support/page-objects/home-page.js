export class HomePage{

    verifyHeaderLogoDisplayed() {
        return cy.get('a').contains('conduit').should('be.visible')
        }

    verifyHeaderHomeButtonDisplayed() {
        return cy.get('a').contains('Home').should('be.visible')
        }

    verifyHeaderSignInButtonDisplayed(){
        return cy.get('a').contains('Sign in').should('be.visible')
    }

    verifyHeaderTitleDisplayed(){
        return cy.get('.banner').get('h1').should('have.text','conduit')
    }

    verifyHeaderSubtitleDisplayed(){
        return cy.get('p').contains('A place to share your knowledge.').should('be.visible')
    }

    verifyArticlesListed(){
        return cy.get('div').should('have.class','col-md-9').and('have.length.greaterThan', 10)
    }

    navigateToNewArticleCreation(){
        return cy.get('.navbar').contains('New Article').click()
    }
    
}