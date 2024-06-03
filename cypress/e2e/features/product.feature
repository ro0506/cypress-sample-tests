@priority_medium
Feature: Adding items to Cart
  As a user,
  I want to view the details of products
  So that I can make informed purchase decisions and add them to my cart

  Background:
    Given I am logged in
    And I am on the product page

  Scenario: View product details and add to cart
    When I view the product details of the "<product>"
    Then I should see the price "<price>" and "<product>"
    And I should be able to add the "<product>" to my cart
    And I should see the remove button on the "<product>"
    And the cart should contain 1 item
    And I should be able to go back to the Product page

    Examples:
      | product                           | price |
      | Sauce Labs Backpack               | 29.99 |
      | Sauce Labs Bike Light             | 9.99  |
      | Sauce Labs Fleece Jacket          | 49.99 |
      | Sauce Labs Onesie                 | 7.99  |
      | Test.allTheThings() T-Shirt (Red) | 15.99 |

  Scenario: Add a specified number of products to the cart
    When I add products to the cart
    Then the cart should contain correct count

  Scenario: Sort the products by a given filter
    When I sort the products by "<filter>"
    Then the product list is sorted by "<message>"

    Examples:
      | filter | message             |
      | az     | Name (A to Z)       |
      | za     | Name (Z to A)       |
      | lohi   | Price (low to high) |
      | hilo   | Price (high to low) |



