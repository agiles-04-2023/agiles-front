Feature: Login
  As a user I want to login to my account

  Scenario: Login with valid credentials
    Given I open the login page
    When I enter the username "testuser"
    And I enter the password "testpassword"
    And I click the login button
    Then I should be logged in
