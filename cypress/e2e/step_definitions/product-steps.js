/// <reference types="Cypress" />

import { Before,Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProductsPage from '../../support/pages/products';

let productsPage;
let productCount = 4;

Before(() => {
  productsPage = new ProductsPage();
  // Load the 'products' fixture
  cy.fixture('products').then((products) => {
    Cypress.env('products', products);
  });

  // Load the 'standardUser' for login
  cy.fixture('users').then((users) => {
    const standardUser = users.standardUser;
    Cypress.env('standardUser', standardUser);
  });
});

Given('I am logged in', () => {
  cy.navigateTo_DemoPage();
  cy.login("standard_user", "secret_sauce");

});
Given('I am on the product page', () => {
  cy.url().should('include', '/inventory');
  cy.get('[data-test="active-option"]').should('have.text', 'Name (A to Z)')

});

When('I view the product details of the {string}', (product) => {
  productsPage.clickProduct(product);

});

When('I add products to the cart', () => {
  productsPage.addItemsToCart(productCount)
} )

When('I sort the products by {string}', (filter) => {
  productsPage.sortProducts(filter);
} )

Then('the product list is sorted by {string}', (filter) => {
  productsPage.assertProductsSortedByFilter(filter);
} )

Then('the cart should contain correct count', () => {
  productsPage.assertCartItemCount(productCount)
})

Then('I should be able to add the {string} to my cart', () => {
  productsPage.addToCart();
});

Then('I should see the price {string} and {string}', (price, product) => {
  productsPage.assertProductDetails(price, product);
});

Then('I should see the remove button on the {string}', (product) => {
  productsPage.assertProductAddedToCart(product);
});

Then('I should be able to go back to the Product page', () => {
  productsPage.backToProducts();
});

Then('the cart should contain 1 item', () => {
  productsPage.assertCartItemCount(1)
});
