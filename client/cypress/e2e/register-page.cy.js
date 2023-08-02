describe('register page', () => {
  it('form is validated', () => {
    cy.visit('http://localhost:3000');

    cy.log("Fields are empty.");
    cy.get('input:invalid').should('have.length', 2);

    cy.get('#email').type('a');
    cy.log("Email field contains less than 3 characters.");
    cy.get('input:invalid').should('have.length', 2);
  })
})