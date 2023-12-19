Feature: Lose-Game
  As a player I lose the game

  Scenario: Start a game
    Given I am on the config page
    When I start a game
    Then I should see the gamePage
    When I click on the A
    And I click on the B
    And I click on the C
    And I click on the D
    And I click on the E
    And I click on the F
    And I click on the G
    And I click on the H
    And I click on the I
    Then I should see the losePage