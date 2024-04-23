Feature: User Registration
  As a new user
  I want to be able to create an account
  So that I can access personalized features of the application.

  Scenario: Successful registration
    Given I am on the registration page
    When I input valid data into the registration form fields
      And I submit the form
    Then I should be redirected to the welcome page
      And I should receive a confirmation email

  Scenario: Registration with an already used email
    Given I am on the registration page
    When I input an email that is already associated with an account
      And I submit the form
    Then I should see an error message stating "This email is already registered"

  Scenario: Registration with invalid email format
    Given I am on the registration page
    When I input an invalid email format in the email field
      And I submit the form
    Then I should see an error message stating "Invalid email format"