export function getClaimIdFromLocalStorage() {
  const localData = JSON.parse(localStorage.getItem('spartacus-local-data'));
  return localData.assets.claims.content.claimNumber;
}

export function selectAutoPolicyForFNOL() {
  cy.get('div.info-card-caption')
    .contains(' BULK1T2000000552 ')
    .parentsUntil('.col-md-4')
    .within(() => {
      cy.get('h4.info-card-caption').contains('Auto Insurance');
      cy.get('.primary-button')
        .contains(' Make a Claim')
        .click();
    });
}

export function checkFNOLCheckoutPage() {
  cy.get('fsa-user-request-progress-bar')
    .should('be.visible')
    .within(() => {
      cy.get('h2').contains('Make a Claim Online');
      cy.get('p.label').should('have.length', '4');
    });
}

export function checkFNOLSteps() {
  cy.get('p.label')
    .eq(0)
    .should('have.text', ' Incident Information ');
  cy.get('p.label')
    .eq(1)
    .should('have.text', ' Incident Report ');
  cy.get('p.label')
    .eq(2)
    .should('have.text', ' General Information ');
  cy.get('p.label')
    .eq(3)
    .should('have.text', ' Summary ');
}

export function populateIncidentInformationStep() {
  cy.get('cx-dynamic-form').within(() => {
    //TODO: can we make random choose
    cy.get('[name=whatHappened]').select('Collision');
    cy.get('[name=whenHappened]').type('2018-01-01');
    cy.get('[name=whatTime]').type('12:12:12');
    cy.get('[name=country]').select('Serbia');
    cy.get('[name=city]').type('Belgräde');
    cy.get('[name=postcode]').type('11040');
    cy.get('[name=address]').type('Omladinskih Brigada 90g');
    cy.get('[name=description]').type(
      'my tesla S was stolen while I was in the shopping center'
    );
    cy.wait(1000);
  });
}

export function populateIncidentReportStep() {
  cy.get('[name=howAccidentOccured]').type(
    'while buying tesla coils, my tesla model s was stolen while buying tesla coils, my tesla model s was stolen'
  );
}

export function populateGeneralInformationStep() {
  cy.get('[name=responsibleForAccident]').type('me');
  cy.get('[name=policeInformed]')
    .eq(0)
    .click();
  cy.get('[name=witnesses]')
    .eq(1)
    .click();
  cy.wait(1500);
}

export function checkSummaryPage() {
  cy.get('fsa-user-request-summary').within(() => {
    cy.get('h2').contains('Summary');
  });
  cy.get('.accordion-item').should('have.length', '3');
}

export function checkIncidentInformationAccordion() {
  cy.get('.accordion-heading')
    .eq(0)
    .should('have.text', ' Incident Information ');
  cy.get('.accordion-item-wrapper')
    .eq(0)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '8');
    });
  cy.get('.accordion-list-item').contains('AutoBreakdown');
}

export function checkIncidentReportAccordion() {
  cy.get('.accordion-heading')
    .eq(1)
    .should('have.text', ' Incident Report ');
  cy.get('.accordion-item-wrapper')
    .eq(1)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '1');
    });
  cy.get('.accordion-list-item').contains('while buying tesla coils');
}

export function checkGeneralInformationAccordion() {
  cy.get('.accordion-heading')
    .eq(2)
    .should('have.text', ' General Information ');
  cy.get('.accordion-item-wrapper')
    .eq(2)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '3');
    });
  cy.get('.accordion-list-item').contains('me');
}

export function checkConfirmationPage(claimId) {
  cy.get('.heading-headline').contains('Claim Confirmation');
  cy.get('.notice-text ').contains(' Your processing number is: ' + claimId);
  cy.get('.content860 p')
    .first()
    .contains(
      'Your claim request has been successfully saved in our system. You can find the confirmation email in the Inbox of your self-service portal and in your mailbox.'
    );
}

export function checkOpenClaimContent() {
  cy.get('.title').contains('Auto Insurance');
  cy.get('.value').contains('BULK1T2000000552');
  cy.get('.title').contains('Date of Loss');
  cy.get('.value').contains('01 Jan 2018');
  cy.get('.title').contains('Status');
  cy.get('.value').contains('OPEN');
}

export function startClaimFromHomepage() {
  cy.get('.Section4 cx-banner')
    .eq(1)
    .click();
  cy.wait(500);
}

export function checkFnolEntryPage() {
  cy.get('.heading-headline').contains('Make a Claim Online');
  cy.get('.section-header-heading').contains('Which car has been damaged?');
  cy.get('fsa-claim-policies').should('be.visible');
  cy.get('fsa-cms-custom-container').should('be.visible');
}

export function selectPolicyOnEntryPage() {
  cy.get('.cx-payment-card')
    .eq(0)
    .within(() => {
      cy.get('.cx-card-link');
    })
    .click();
  cy.get('.form-check-input').click();
}

export function deleteClaimFromDialog(claimId) {
  cy.contains('.info-card', claimId).within(() => {
    cy.get('.action-links-secondary-button').click();
  });
  cy.get('h3').contains('Delete started claim process');
  cy.get('p').contains('The following claim process will be deleted');
  cy.get('fsa-deleted-claim-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}

export function checkClaimsPage(claimId) {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Claims',
  });
  cy.get('.heading-headline').contains('Claims');
}

export function checkAndResumeSpecificClaim(claimId) {
  cy.contains('.info-card', claimId).within(() => {
    this.checkOpenClaimContent();
    cy.get('.secondary-button')
      .contains('Resume')
      .click();
    cy.wait(1000);
  });
}
