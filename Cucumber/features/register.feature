Feature: Register
  As a user I want to register on the website

  Scenario: Register with valid data
    Given I am on the register page
    When I enter de full name "John Doe"
    And I enter the email
    And I enter the secret-password "asd123"
    And I click on the register button
    Then I should be on the home page