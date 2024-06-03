// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
Cypress.Commands.add('navigateTo_DemoPage', () => {
  cy.visit('/');

})

Cypress.Commands.add('login', (email, pw) => {

  cy.get('[data-test="username"]').type(email)

  cy.get('[data-test="password"]').type(pw).then($pass => {
    const pw = $pass.val();
    cy.log(pw)
  })

  cy.get('[data-test="login-button"]').click();
})

//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })