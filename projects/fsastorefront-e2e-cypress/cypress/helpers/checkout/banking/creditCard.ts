import * as shared from '../sharedFunctions';

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Credit Card Insurance',
    items: [
      {
        name: 'Credit Card Protection',
        available: true,
      },
      {
        name: 'Special Support',
        available: true,
      },
      {
        name: 'Overseas Insurance',
        available: false,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartCreditCard() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €89.00 ',
    products: [
      {
        title: ' Premium Card: ',
        value: ' €89.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkCreditCardComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Basic Card',
        price: '€49.00',
      },
      {
        name: 'Premium Card',
        price: '€89.00',
      },
      {
        name: 'Exclusive Card',
        price: '€169.00',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectPremiumCard() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Premium Card');
      cy.get('.primary-button').click();
    });
}
