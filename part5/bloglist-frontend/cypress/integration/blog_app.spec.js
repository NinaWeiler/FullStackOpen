

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
    const otherUser = {
      name: 'Wyatt',
      username: 'wyatt',
      password: 'callie'
    }
    cy.request('POST', 'http://localhost:3003/api/users', otherUser)

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

    it('fails with wrong credentials', function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'callie', password: 'brandon' })

    })

    it('A blog can be created', function() {
      cy.contains('callie logged in')
      cy.contains('Create new blog').click()
      cy.get('#title').type('New beginnings')
      cy.get('#author').type('Lena Adams')
      cy.get('#url').type('www.fosters.com')

      cy.get('#create').click()
      cy.contains('New beginnings')
    })

    describe('and a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'Fall colors',
          author: 'Brandon Foster',
          url: 'www.fosters.com/fall'
        })
      })

      it('it can be liked', function() {
        cy.contains('Fall colors').parent().find('button').as('showButton')
        cy.get('@showButton').click()
        cy.get('@showButton').should('contain', 'hide')

        cy.get('#like').click()
      })

      it('user can remove their blog', function() {
        cy.contains('Fall colors').parent().find('button').as('showButton')
        cy.get('@showButton').click()

        cy.get('#details')
          .contains('remove').click()
        cy.get('html').should('not.contain', 'Fall colors')
      })

      it('blog cannot be removed by another user', function() {
        cy.contains('log out').click()
        cy.login({ username: 'wyatt', password: 'callie' })
        cy.contains('Fall colors').parent().find('button').as('showButton')
        cy.get('@showButton').click()

        cy.get('#details').should('not.contain', 'remove')

      })
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Plants basics',
          author: 'Mariana Foster',
          url: 'www.fosters.com/plants',
          likes: 20
        })
        cy.createBlog({
          title: 'Wrestling',
          author: 'Jasper Foster',
          url: 'www.fosters.com/wrestling',
          likes: 5
        })
        cy.createBlog({
          title: 'Piano for dummies',
          author: 'Brandon Foster',
          url: 'www.fosters.com/piano',
          likes: 19
        })
      })

      it('blogs are ordered according to likes, from most to last', function() {
        cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
          const data = response.body
          expect(data).to.have.length(3)
        })

        cy.get('.showButton').should('have.length', 3).click({ multiple: true })
        cy.get('.amountOfLikes').then((likes) => {
          expect(likes[0]).to.contain(20)
          expect(likes[1]).to.contain(19)
          expect(likes[2]).to.contain(5)
        })
      })
    })
  })

})


