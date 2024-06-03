@priority_high
Feature: Login Functionality

  As a user, 
  I want to log into the Saucedemo app using different types of accounts 
  So that I can access the dashboard.

  Scenario: Login with <userType> account
    Given I access the Saucedemo app
    When I enter the "<userType>" and password
    Then I should see the dashboard

    Examples:
      | userType                |
      | standardUser            |
      | performance_glitch_user |
      | problem_user            |
      | visual_user             |

  Scenario: Login with invalid account
    Given I access the Saucedemo app
    When I enter a locked-out username
    Then I should see an error message