

/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create user
    const user = {
      name: 'Callie Jacobs',
      username: 'callie',
      password: 'brandon'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Sign in')
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Sign in').click()
      cy.get('#username').type('callie')
      cy.get('#password').type('brandon')
      cy.get('#login-button').click()

      cy.contains('callie logged in')
    })

    it.only('fails with wrong credentials', function() {
      cy.contains('Sign in').click()
      cy.get('#username').type('callie')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'callie logged in')
    })
  })

})


