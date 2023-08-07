describe('Form validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Fields cannot be empty', () => {
    cy.get('#btn-add').click();
    cy.contains('Email is a required field').should('exist');
  })

  it('Email must be at least 3 characters', () => {
    cy.get('#email').type('h');
    cy.get('#btn-add').click();
    cy.contains('Email must be a valid email').should('exist');
  })

  it('Email must be a valid email', () => {
    cy.get('#email').type('bobemail');
    cy.get('#btn-add').click();
    cy.contains('Email must be a valid email').should('exist');
  })

  it('Email cannot be longer than 256 characters', () => {
    let longEmail = 'bobemail';
    longEmail += Cypress._.repeat('l', 250);
    longEmail += '@gmail.com';

    cy.get('#email').type(longEmail);
    cy.get('#btn-add').click();
    cy.contains('Email must be at most 256 characters').should('exist');
  })
})