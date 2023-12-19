Feature: Login
  As a user I want to login to my account

  Scenario: Login with valid credentials
    Given I open the login page
    When I enter the email "test@gmail.com"
    And I enter the password "test123"
    And I click the sign-in button
    Then I should be logged in
