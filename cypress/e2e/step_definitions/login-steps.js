/// <reference types="Cypress" />

import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
   cy.fixture('users').then((users) => {
      Cypress.env('users', users);
    });
})

Given('I access the Saucedemo app', () => {
   cy.navigateTo_DemoPage();
})

When('I enter the {string} and password',(userType) => {
   const users = Cypress.env('users');
   if (!users || !users[userType]) {
      throw new Error(`User type ${userType} not found in fixture`);
    }
    const user = users[userType];
   console.log(user)
   cy.login(user.username, user.password);
 })

 When('I enter a locked-out username', () => {
   const invalidUser = Cypress.env('users').lockedoutUser;
   cy.login(invalidUser.username, invalidUser.password);
 })

 Then('I should see the dashboard', () => {
   cy.url().should('include', '/inventory');
 })

 Then('I should see an error message', () => {
   cy.get('[data-test="error"]').should('contain', 'this user has been locked out')
 })

