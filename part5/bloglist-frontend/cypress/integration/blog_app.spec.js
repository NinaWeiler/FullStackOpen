

/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    //cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create user
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Sign in')
    cy.contains('login').click()
  })
  /*
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
    })
  }) */

})


