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

// describe('Form validation on customer update page', () => {
//   beforeEach(() => {
//     cy.task('seedDB');
//     login();
//     cy.visit('http://localhost:3000/customers');
//     cy.contains('View').click();
//     cy.contains('Edit').click();
//     cy.get('#name').clear();
//     cy.get('#email').clear();
//   });

//   it('Name is required', () => {
//     cy.get('#email').type('haroon@gmail.com');
//     cy.contains('Update').click();
//     cy.contains('Name must be at least 3 characters').should('exist');
//   })

//   it('Name is required', () => {
//     cy.get('#email').type('haroon@gmail.com');
//     cy.contains('Update').click();
//     cy.contains('Name must be at least 3 characters').should('exist');
//   })

//   it('Name must be at least 3 characters', () => {
//     cy.get('#name').type('G');
//     cy.contains('Update').click();
//     cy.contains('Name must be at least 3 characters').should('exist');
//   })

//   it('Name cannot be longer than 300 characters', () => {
//     cy.get('#name').invoke('val', Cypress._.repeat('l', 300));
//     cy.get('#name').type('l');
//     cy.contains('Update').click();
//     cy.contains('Name must be at most 300 characters').should('exist');
//   })

//   it('Email is required', () => {
//     cy.get('#name').type('Gary Smith');
//     cy.contains('Update').click();
//     cy.contains('Email is a required field').should('exist');
//   })

//   it('Email must be at least 3 characters', () => {
//     cy.get('#email').type('h');
//     cy.contains('Update').click();
//     cy.contains('Email must be a valid email').should('exist');
//   })

//   it('Email must be a valid email', () => {
//     cy.get('#email').type('bobemail');
//     cy.contains('Update').click();
//     cy.contains('Email must be a valid email').should('exist');
//   })

//   it('Email cannot be longer than 256 characters', () => {
//     let longEmail = 'bobemail';
//     longEmail += Cypress._.repeat('l', 250);
//     longEmail += '@gmail.com';

//     cy.get('#email').invoke('val', longEmail);
//     cy.get('#email').type('l');
//     cy.contains('Update').click();
//     cy.contains('Email must be at most 256 characters').should('exist');
//   })
// })

describe('Updates customer information', () => {
  beforeEach(() => {
    cy.task('seedDB');
    login();
    cy.visit('http://localhost:3000/customers');
    cy.contains('View').click();
    cy.contains('Edit').click();
    cy.get('#name').clear();
    cy.get('#email').clear();
  });

  it('Correctly updates customer information', () => {
    cy.get('#name').type('Bob Smith');
    cy.get('#email').type('bob@gmail.com');
    cy.contains('Update').click();
    cy.contains('Bob Smith').should('exist');
  })
})

describe('History', () => {
  beforeEach(() => {
    cy.task('seedDB');
    login();
    cy.visit('http://localhost:3000/customers');
    cy.contains('View').click();
  });

  it('Creates customer history', () => {
    cy.get('#date').type('2022-08-14');
    cy.get('#info').type('Created another account.');
    cy.contains('Add').click();
    cy.contains('14-08-2022').should('exist');
  })

  it('Updates customer history', () => {
    cy.get('.btn-view').click();
    cy.get('#date').type('2022-08-14');
    cy.contains('Update').click();
    cy.contains('14-08-2022').should('exist');
  })
})