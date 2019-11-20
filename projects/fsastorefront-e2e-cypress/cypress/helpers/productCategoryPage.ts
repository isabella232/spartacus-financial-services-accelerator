export function checkComponets() {
  cy.get('cx-page-slot.Section1 fsa-enriched-responsive-banner');
  cy.get('span.enriched-banner__title').should(
    'contain',
    'Apply online and save your valuable time'
  );
  cy.get('fsa-enriched-responsive-banner');
  cy.get('cx-page-slot.Section2B');
  cy.get('cx-page-slot.Section4 fsa-product-feature');
  cy.get('cx-page-slot.Section2B cx-banner').should('be.visible');
  cy.get('cx-page-slot.Section2B cx-paragraph').should('be.visible');
}

export function checkQuoteButtons() {
  cy.get('a.enriched-banner__styled-text')
    .should('contain', 'Get a quote')
    .should('contain', 'Retrieve a quote');
}

export function checkApplicationButtons() {
  cy.get('a.enriched-banner__styled-text')
    .should('contain', 'Request a product')
    .should('contain', 'Retrieve an Application');
}

export function startCheckoutForBanking() {
  cy.get('a.enriched-banner__styled-text')
    .should('contain', ' Request a product')
    .click();
}
