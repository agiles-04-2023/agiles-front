Feature: Start-Game
  As a player I want to start a game

  Scenario: Start a game
    Given I am on the Home page
    When I click on the Game button
    Then I should see the config page
    When I click on the NO button
    And I click on the Start Game button
    Then I should see the game page