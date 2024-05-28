Feature: Calculate Ticket Price
  As a system
  I want to calculate the final ticket price based on time of travel, senior status, and family conditions
  So that users are charged the correct amount based on their circumstances.

  Scenario: Calculate price during peak hours with no discounts
    Given the base price is 100
    And the travel time is "08:00"
    And the user does not have a senior card
    And the user is not traveling with a child
    And the user does not have a family card
    When the ticket price is calculated
    Then the final ticket price should be "100.00"

  Scenario: Calculate price outside peak hours with basic discount
    Given the base price is 100
    And the travel time is "15:00"
    And the user does not have a senior card
    And the user is not traveling with a child
    And the user does not have a family card
    When the ticket price is calculated
    Then the final ticket price should be "95.00"

  Scenario: Calculate price with senior card discount outside peak hours
    Given the base price is 100
    And the travel time is "10:00"
    And the user has a senior card
    And the user is not traveling with a child
    And the user does not have a family card
    When the ticket price is calculated
    Then the final ticket price should be "66.00"

  Scenario: Calculate price for traveling with a child without a family card outside peak hours
    Given the base price is 100
    And the travel time is "10:00"
    And the user does not have a senior card
    And the user is traveling with a child
    And the user does not have a family card
    When the ticket price is calculated
    Then the final ticket price should be "90.00"

  Scenario: Calculate price for traveling with a child with a family card outside peak hours
    Given the base price is 100
    And the travel time is "10:00"
    And the user does not have a senior card
    And the user is traveling with a child
    And the user has a family card
    When the ticket price is calculated
    Then the final ticket price should be "50.00"

  Scenario: Calculate price during peak hours with a family card
    Given the base price is 100
    And the travel time is "08:00"
    And the user does not have a senior card
    And the user is traveling with a child
    And the user has a family card
    When the ticket price is calculated
    Then the final ticket price should be "50.00"
