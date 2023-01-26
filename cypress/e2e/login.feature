Feature: Login Feature

    This feature is required for user to login

    Scenario: Success login
    Given A user opens the login page
    Then A user enters the username "standard_user"
    And A user enters the password "secret_sauce"
    And A user clicks on the login button
    Then A user will be logged in

    Scenario: Faield login
    Given A user opens the login page
    Then A user enters the username "locked_out_user"
    And A user enters the password "secret_sauce"
    And A user clicks on the login button
    Then A user will be receiving a failed message