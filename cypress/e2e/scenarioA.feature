Feature: ScenarioA Feature

    This feature is checking landing page components showing

    Scenario: Landing Page components check-up
    Given A home page exist and contains components
    When A user opens a home page
    Then A user verifies header logo is diplayed
    And A user verifies header home button is diplayed
    And A user verifies header sign in button is diplayed
    And A user verifies header title is diplayed
    And A user verifies header subtitle is diplayed
    And A user verifies articles are listed

    Scenario: Registering a new user
    Given A webpage allows registering new users
    When A user clicks on Sign Up button
    And A user enters a username
    And A user enters an email
    And A user enters a password
    Then A user verifies proper user is created and logged in

    Scenario: Editing settings
    Given A user can log in with previously created account
    When A user clicks on Settings option
    And A user inputs users picture
    And A user enters hisher bio
    And A user saves changes
    Then A user verifies that all previous data is properly shown

    Scenario: Submiting an article
    Given A user is logged in to portal
    When A user clicks on New Article option
    Then A user can populate article data, save changes and verify new article with proper article data is created

    Scenario: Inputing a mocked data
    Given A user is logged in to portal
    When An API request from portal communication is intercepted
    And A mocked data is inserted as a response
    Then A user can verify article data from mocked data is shown on portal
