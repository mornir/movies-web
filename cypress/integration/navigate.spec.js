/// <reference types="cypress" />

const moviesURL = '/movies/'

context('Navigation', () => {
  it('successfully loads data from local payload', () => {
    // Force 404 if it tries to fetch from API
    cy.intercept('tufjlt9c.api.sanity.io/v1/data/query/production', (req) =>
      req.reply(404)
    ).as('api')

    cy.visit(moviesURL)

    cy.get('[data-cy="movie_70981"]').click()
    cy.contains('A team of explorers discover')
    cy.reload()
    cy.contains('A team of explorers discover')
  })

  it('redirects to 404 page if movie does not exist', () => {
    cy.visit(moviesURL + 'a-movie-that-do-not-exist/')
    cy.contains('404 not found')
  })
})

context('Preview Mode', () => {
  it('cannot fetch draft content without auth token', () => {
    cy.clearCookies({ domain: null })
    cy.visit(moviesURL + 'test-movie/?preview=true', {
      failOnStatusCode: false,
    })
    cy.get('main').should('not.contain', 'Test movie')
  })

  it('fetches fresh data from CMS', () => {
    cy.setCookie('sanitySession', Cypress.env().authCookie, {
      domain: '.tufjlt9c.api.sanity.io',
      sameSite: 'none',
      secure: true,
    })
    cy.visit(moviesURL + 'test-movie/?preview=true', {
      failOnStatusCode: false,
    })
    cy.contains('Draft Preview')
    cy.contains('Test movie')
  })
})
