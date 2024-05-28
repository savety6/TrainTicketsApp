Feature: User Login
  As a registered user
  I want to be able to log in
  So that I can access my personal account features.

  Scenario: Successful login
    Given I am on the login page
    When I enter valid login credentials
      And I submit the form
    Then I should be redirected to my dashboard

  Scenario: Login with incorrect credentials
    Given I am on the login page
    When I enter an incorrect username and/or password
      And I submit the form
    Then I should see an error message stating "Incorrect username or password"

  Scenario: Forgotten password
    Given I am on the login page
    When I click on the "Forgot password?" link
    Then I should be taken to the password reset page