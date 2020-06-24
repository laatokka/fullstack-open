describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Hillevi Hallevi Ruskea Kana',
      username: 'Hillevi',
      password: 'ruskea kana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('user can login', function () {
      cy.contains('login').click()
      cy.get('#username').type('Hillevi')
      cy.get('#password').type('ruskea kana')
      cy.get('#login').click()

      cy.contains('Hillevi Hallevi Ruskea Kana logged in')
    })

    it('invalid user cannot login', function () {
      cy.contains('login').click()
      cy.get('#username').type('Hackzor')
      cy.get('#password').type('1337')
      cy.get('#login').click()

      cy.contains('wrong credentials')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('Hillevi')
      cy.get('#password').type('ruskea kana')
      cy.get('#login').click()
    })

    it('A blog can be created', function () {
      cy.contains('add a new blog').click()
      cy.get('#title').type('Cypress is great! ')
      cy.get('#author').type('Mr. Maple')
      cy.get('#url').type('allkindoftreesarethebest.com')
      cy.get('#create').click()
      cy.contains('Cypress is great! Mr. Maple')
    })

    it('a blog can be liked', function () {
      cy.contains('add a new blog').click()
      cy.get('#title').type('Cypress is great! ')
      cy.get('#author').type('Mr. Maple')
      cy.get('#url').type('allkindoftreesarethebest.com')
      cy.get('#create').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('user can delete a blog', function () {
      cy.contains('add a new blog').click()
      cy.get('#title').type('Cypress is great! ')
      cy.get('#author').type('Mr. Maple')
      cy.get('#url').type('allkindoftreesarethebest.com')
      cy.get('#create').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.reload()
      cy.get('html').should('not.contain', 'Cypress is great!')
    })

    it.only('blog with most likes is first', function () {
      cy.contains('add a new blog').click()

      cy.get('#title').type('Cypress is great! ')
      cy.get('#author').type('Mr. Maple')
      cy.get('#url').type('allkindoftreesarethebest.com')
      cy.get('#create').click()

      cy.get('#title').type('A Competitor has arrived ')
      cy.get('#author').type('Mr no fun')
      cy.get('#url').type('everythingsseerious.fi')
      cy.get('#create').click()

      cy.contains('view').click()
      cy.contains('view').click()

      cy.get('button').then( buttons => {
        cy.wrap(buttons[buttons.length - 2]).click()
        cy.wrap(buttons[buttons.length - 2]).click()
        cy.wrap(buttons[buttons.length - 2]).click()
        cy.wrap(buttons[buttons.length - 2]).click()
      })

      cy.request('GET', 'http://localhost:3001/api/blogs')
      cy.wait(3000)

      cy.get('button').then(buttons => {
        cy.wrap(buttons[buttons.length - 2]).click()
        cy.wrap(buttons[buttons.length - 2]).click()
      })
      cy.contains(2)
    })
  })
})