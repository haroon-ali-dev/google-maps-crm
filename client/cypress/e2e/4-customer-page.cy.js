const login = () => {
  cy.session("login", () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('haroon@gmail.com');
    cy.get('#password').type('password321');
    cy.get('#btn-add').click();
    cy.contains('Logout').should('exist');
  });
}

describe('Display customer information', () => {
  beforeEach(() => {
    cy.task('seedDB');
    login();
    cy.visit('http://localhost:3000/customers');
    cy.contains('View').click();
  });

  it('Correctly displays customer information', () => {
    cy.contains('Gary Smith').should('exist');
  })
})