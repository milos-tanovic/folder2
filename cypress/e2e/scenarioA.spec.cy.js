/// <reference types="cypress" />
import {HomePage} from "./page-objects/home-page.js"

const faker = require('faker')
const { waitFor } = require('wd/lib/commands')
var userFirstName = faker.name.firstName()
var userLastName = faker.name.lastName()
var imageUrl = 'https://www.freepnglogos.com/uploads/mr-bean/rowan-atkinson-png-download-bean-png-image-for-0.png'
var email = faker.internet.email()
var password = faker.internet.password()
const bio = faker.random.words(10)
const homePage = new HomePage()


describe("scenario A", () =>{
    it("should complete scenario A", () =>{
        cy.navigateToHomePage()
        /*
        cy.get('a').contains('conduit').should('be.visible')
        cy.get('a').contains('Home').should('be.visible')
        cy.get('a').contains('Sign in').should('be.visible')
        cy.get('.banner').get('h1').should('have.text','conduit')
        cy.get('p').contains('A place to share your knowledge.').should('be.visible')
        cy.get('div').should('have.class','col-md-9').and('have.length.greaterThan', 10)
        */
        homePage.verifyHeaderLogoDisplayed()
        homePage.verifyHeaderHomeButtonDisplayed()
        homePage.verifyHeaderSignInButtonDisplayed()
        homePage.verifyHeaderTitleDisplayed()
        homePage.verifyHeaderSubtitleDisplayed()
        homePage.verifyArticlesListed()
        })
    })

describe("scenario B", () => {
    it("should complete scenario B", () =>{
        cy.navigateToHomePage()
        /* //login during development using existing user
        email = 'Alvah81@yahoo.com'
        password = 'kEtMU8jlamBn77D'
       
        cy.loginToApp(email, password)
        cy.get('a').contains('Sign in').should('be.visible').click()
        var userFirstName = 'Friedrich'
        var userLastName = 'Ledner'
        cy.get("input[placeholder=\"Email\"]").type(email);  //Alvah81@yahoo.com
        cy.get("input[placeholder=\"Password\"]").type(password); //kEtMU8jlamBn77D
        cy.get('.btn').click()
        */
        /*
        // register new user
        cy.get('a').contains('Sign up').click()
        cy.url().should('include', '/register')
        cy.get("input[placeholder=\"Username\"]").type(userFirstName + userLastName);
        cy.get("input[placeholder=\"Email\"]").type(email);
        cy.get("input[placeholder=\"Password\"]").type(password);
        cy.get('.btn').click()
        */
        cy.registerNewUser(email, password, userFirstName, userLastName)
        homePage.verifyProperUserIsLoggedIn(userFirstName, userLastName)
        //cy.get('.navbar').contains(userFirstName + userLastName)

        // edit settings
        /*
        cy.get('.navbar').contains('Settings').click()
        cy.get('input[placeholder="URL of profile picture"]').clear().type(imageUrl)
        cy.get('fieldset').find('textarea').clear().type(bio)
        */
        cy.editUserSettings(imageUrl, bio)
        cy.get('form').submit()

        //verify settings are updated
        homePage.verifySettingsPageIsLoadedAfterUpdate(userFirstName, userLastName)
        homePage.verifyProfilePictureIsShown(imageUrl)
        homePage.verifyShortBioIsShown(bio)
        /*
        cy.url({timeout: 10000}).should('include', userFirstName + userLastName)
        cy.get('img').invoke('attr', 'src').should('include', imageUrl)
        cy.get('p').contains(bio)
        */

    })
})

describe("scenario C", () => {
    it("should complete scenario C", () =>{
        //email = 'Alvah81@yahoo.com'
        //password = 'kEtMU8jlamBn77D'
        var verifyArticleTitle = null
        cy.navigateToHomePage()

        cy.loginToApp(email, password)
        homePage.navigateToNewArticleCreation()

        cy.fixture('article.json').then(function (data){
            this.data = data
            cy.get('input[placeholder="Article Title"]').type(this.data.articleTitle)
            verifyArticleTitle = this.data.articleTitle
            cy.get('input[placeholder="What\'\s this article about?"]').type(this.data.articleAbout)
            cy.get('textarea').type(this.data.articleText)
           

            cy.get('.btn').click()
            //cy.wait(10000)
            cy.get('h1', {timeout: 10000}).contains(verifyArticleTitle)
            //delete previously created article
            cy.get('button').contains('Delete Article').click()
            //return verifyArticleTitle
        })
       
    })
    }) 

    describe("scenario D", () => {
        it("should complete scenario D", () => {
            //email = 'Alvah81@yahoo.com'
            //password = 'kEtMU8jlamBn77D'
            cy.visit('/')
            cy.loginToApp(email, password)

            cy.intercept("GET", "https://api.realworld.io/api/articles/feed?limit=10&offset=0", {fixture: "mock-article.json",}).as("getMockArticles")
            cy.wait("@getMockArticles")
            //cy.url().reload

            cy.fixture('mock-article.json').then(function (data){
                this.data = data

                cy.get('div').should('have.class','col-md-9').and('contain', this.data.articles[0].title)
                cy.get('div').should('have.class','col-md-9').and('contain', this.data.articles[1].title)
                cy.get('div').should('have.class','col-md-9').and('contain', this.data.articles[0].description)
                cy.get('div').should('have.class','col-md-9').and('contain', this.data.articles[1].description)

            })
        })
    })