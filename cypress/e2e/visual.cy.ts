describe('Visual regression', () => {
  it('homepage loads', () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
  });

  it('header matches baseline', () => {
    cy.visit('/');
    cy.get('header').compareSnapshot({ name: 'header', testThreshold: 0.03 });
  });
});
