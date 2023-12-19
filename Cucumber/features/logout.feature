Feature: Logout
  As a user I want to logout to page

  Scenario: Logout successfully
    Given I am staying on the homepage
    When I am logged in
    When I click on the logout button
    Then I should see the login button
