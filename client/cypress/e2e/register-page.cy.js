describe('Form validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Email is required', () => {
    cy.get('#password').type('password321');
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

  it('Password is required', () => {
    cy.get('#email').type('haroon@gmail.com');
    cy.get('#btn-add').click();
    cy.contains('Password must be at least 3 characters').should('exist');
  })

  it('Password must be at least 3 characters', () => {
    cy.get('#password').type('h');
    cy.get('#btn-add').click();
    cy.contains('Password must be at least 3 characters').should('exist');
  })

  it('Password cannot be longer than 15 characters', () => {
    cy.get('#password').type('password32111111');
    cy.get('#btn-add').click();
    cy.contains('Password must be at most 15 characters').should('exist');
  })
})

describe('User registration', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Registers user', () => {
    cy.get('#email').type('haroon@gmail.com');
    cy.get('#password').type('password321');
    cy.get('#btn-add').click();
    cy.contains('User registered.').should('exist');
  })
})