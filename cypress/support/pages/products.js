/// <reference types = "Cypress" />
class ProductsPage {
  // Method to get product names
  getProductNames() {
    return cy.get('[data-test="inventory-item-name"]').then(items => {
      return Cypress._.map(items, 'innerText');
    });
  }

  // Method to get product prices
  getProductPrices() {
    return cy.get('[data-test="inventory-item-price"]').then(items => {
      return Cypress._.map(items, item => parseFloat(item.innerText.replace('$', '')));
    });
  }
  // Method to click product
  clickProduct(productName) {
    cy.get('.inventory_item')
    .contains('.inventory_item_name', productName)
    .click()
  }

  // Method to add a product in the Product details page
  addToCart() {
    cy.get('#add-to-cart').click()
  }
  // Method to go back to Products page
  backToProducts() {
    cy.get('#back-to-products').click()
  }

  // Method to add a specified number of products to the cart
  addItemsToCart(count) {
    cy.get('[data-test="inventory-item"]').each(($el, index) => {
      if (index < count) {
        cy.wrap($el).find('[id^=add-to-cart]').click();
      }
    });
  }
  //Method to assert when the product is added to cart
  assertProductAddedToCart(productName) {
    cy.contains('[data-test="inventory-item"]', productName)
      .find('[id^=remove]')
      .should('exist');
  }

  assertProductDetails(price, productName) {
    cy.get('[data-test="inventory-item-name"]')
      .should('have.text', productName)
    cy.get('[data-test="inventory-item-price"]')
      .should('contain.text', price)
  }

  assertCartItemCount(expectedCount) {
    cy.get('[data-test="shopping-cart-badge"]')
      .should('have.text', expectedCount.toString());
  }

  // Methods to sort products
  sortProducts(filter) {
    cy.get('[data-test="product-sort-container"]').select(filter);
  }

  // Assertion methods to verify products
  assertProductsSortedByFilter(filter) {
    switch (filter) {
      case 'Name (A to Z)':
        this.getProductNames().then((names) => {
          const sortedNames = Cypress._.sortBy(names);
          cy.log('Sorted Names (A to Z):', sortedNames);
          expect(names).to.deep.equal(sortedNames);
        });
        break;
      case 'Name (Z to A)':
        this.getProductNames().then((names) => {
          const sortedNames = Cypress._.sortBy(names).reverse();
          cy.log('Sorted Names (Z to A):', sortedNames);
          expect(names).to.deep.equal(sortedNames);
        });
        break;
      case 'Price (low to high)':
        this.getProductPrices().then((prices) => {
          const sortedPrices = Cypress._.sortBy(prices);
          cy.log('Sorted Prices (low to high):', sortedPrices);
          expect(prices).to.deep.equal(sortedPrices);
        });
        break;
      case 'Price (high to low)':
        this.getProductPrices().then((prices) => {
          const sortedPrices = Cypress._.sortBy(prices).reverse();
          cy.log('Sorted Prices (high to low):', sortedPrices);
          expect(prices).to.deep.equal(sortedPrices);
        });
        break;
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  }

}

export default ProductsPage;
