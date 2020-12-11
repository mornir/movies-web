/// <reference types="cypress" />

context('Navigation', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.get('[data-cy="movie_70981"]').click()
    cy.contains('Prometheus')
    cy.reload()
    cy.contains('Prometheus')
  })

  it('redirects to 404 page if movie does not exist', () => {
    cy.visit('/a-movie-that-do-not-exist', {
      failOnStatusCode: false,
    })
    cy.contains('404 not found')
  })
})

context('Preview Mode', () => {
  it('cannot fetch draft content without auth token', () => {
    cy.clearCookies({ domain: null })
    cy.visit('/test-movie/?preview=true', {
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
    cy.visit('/test-movie/?preview=true', {
      failOnStatusCode: false,
    })
    cy.contains('Draft Preview')
    cy.contains('Test movie')
  })
})
