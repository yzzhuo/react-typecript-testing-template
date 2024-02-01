describe('Just visit e2e test', () => {
  it('should get the 2 euro', () => {
    cy.visit('/')

      // fill in the form
    cy.get('input[data-test-id="cartValue"]').type('20')
    cy.get('input[data-test-id="deliveryDistance"]').type('900')
    cy.get('input[data-test-id="numberOfItems"]').type('1')
    cy.get('input[data-test-id="orderTimeDate"]').type('2023-02-01')
    cy.get('input[data-test-id="orderTime"]').type('12:00')

    // submit the form
    cy.get('button').contains('Calculate delivery price').click()
    cy.get('span[data-test-id="fee"]').invoke('text').should('equal', '2')
  })
})