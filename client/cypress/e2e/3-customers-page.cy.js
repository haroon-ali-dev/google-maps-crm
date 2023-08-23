const login = () => {
  cy.session("login", () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('haroon@gmail.com');
    cy.get('#password').type('password321');
    cy.get('#btn-add').click();
    cy.contains('Logout').should('exist');
  });
}

describe('Form validation', () => {
  beforeEach(() => {
    cy.task('seedDB');
    login();
    cy.visit('http://localhost:3000/customers');
  });

  it('Name is required', () => {
    cy.get('#email').type('haroon@gmail.com');
    cy.get('#btn-add').click();
    cy.contains('Name must be at least 3 characters').should('exist');
  })

  it('Name must be at least 3 characters', () => {
    cy.get('#name').type('G');
    cy.get('#btn-add').click();
    cy.contains('Name must be at least 3 characters').should('exist');
  })

  it('Name cannot be longer than 300 characters', () => {
    cy.get('#name').invoke('val', Cypress._.repeat('l', 300));
    cy.get('#name').type('l');
    cy.get('#btn-add').click();
    cy.contains('Name must be at most 300 characters').should('exist');
  })

  it('Email is required', () => {
    cy.get('#name').type('Gary Smith');
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

    cy.get('#email').invoke('val', longEmail);
    cy.get('#email').type('l');
    cy.get('#btn-add').click();
    cy.contains('Email must be at most 256 characters').should('exist');
  })
})

describe('Creating customers', () => {
  beforeEach(() => {
    cy.task('seedDB');
    login();
    cy.visit('http://localhost:3000/customers');
  });

  it('Creates a customer', () => {
    cy.get('#name').type('Samantha Bishop');
    cy.get('#email').type('samantha@gmail.com');
    cy.get('#postcode').type('M16 0EF');
    cy.get('#btn-add').click();
    cy.contains('samantha@gmail.com').should('exist');
  })
})