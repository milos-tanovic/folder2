/// <reference types="cypress" />
import {HomePage} from "../../support/page-objects/home-page.js"
import { SignedInPage } from "../../support/page-objects/signed-in-page.js"
import { ProfilePage } from "../../support/page-objects/profile-page.js"
import { SettingsPage } from "../../support/page-objects/new-article-page.js"

const faker = require('faker')
const { waitFor } = require('wd/lib/commands')
export var userFirstName = faker.name.firstName()
export var userLastName = faker.name.lastName()
export var imageUrl = 'https://www.freepnglogos.com/uploads/mr-bean/rowan-atkinson-png-download-bean-png-image-for-0.png'
export var email = faker.internet.email()
export var password = faker.internet.password()
export const bio = faker.random.words(10)
export var verifyArticleTitle = null
const homePage = new HomePage()
const signedInPage = new SignedInPage()
const profilePage = new ProfilePage()
const settingsPage = new SettingsPage()


describe("scenario A", () =>{
    it("should complete scenario A", () =>{
        cy.navigateToHomePage()
   
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
        */
        // register new user
        cy.registerNewUser(email, password, userFirstName, userLastName)
        signedInPage.verifyProperUserIsLoggedIn(userFirstName, userLastName)

        // edit settings
        cy.editUserSettings(imageUrl, bio)
        cy.get('form').submit()

        //verify settings are updated
        profilePage.verifyProfilePageIsLoadedAfterUpdate(userFirstName, userLastName)
        profilePage.verifyProfilePictureIsShown(imageUrl)
        profilePage.verifyShortBioIsShown(bio)
    })
})

describe("scenario C", () => {
    it("should complete scenario C", () =>{
        //email = 'Alvah81@yahoo.com'
        //password = 'kEtMU8jlamBn77D'
        cy.navigateToHomePage()
        cy.loginToApp(email, password)
        homePage.navigateToNewArticleCreation()

        cy.createNewArticleAndVerify(verifyArticleTitle)
       
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

            cy.fixture('mock-article.json').then(function (data){
                this.data = data

                cy.get('div').should('have.class','col-md-9').and('contain', this.data.articles[0].title)
                cy.get('div').should('have.class','col-md-9').and('contain', this.data.articles[1].title)
                cy.get('div').should('have.class','col-md-9').and('contain', this.data.articles[0].description)
                cy.get('div').should('have.class','col-md-9').and('contain', this.data.articles[1].description)

            })
        })

    })