describe('Ejecutar juego', () => {
  it('Iniciar juego', () => {
    cy.visit('/')
    cy.contains('hola').click()
    cy.url().should('include', '/game')
    cy.get('#levels').select('medio')
    // cy.get('.bg-red-3003 > .w-6').click()
    cy.contains('Iniciar juego').click()
  })
})