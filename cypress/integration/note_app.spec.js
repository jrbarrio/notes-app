describe('Note App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    
    it('frontpage can be open', () => {        
        cy.contains('Notes')
    })

    it('user can login', () => {
        cy.contains('Show').click()
        cy.get('[placeholder="Username"]').type('jorge')
        cy.get('[placeholder="Password"]').type('psw')
        cy.get('#form-login-button').click()
        cy.contains('Create a new note')
    })

    describe('when logged in', () => {
        beforeEach(() => {
            cy.contains('Show').click()
            cy.get('[placeholder="Username"]').type('jorge')
            cy.get('[placeholder="Password"]').type('psw')
            cy.get('#form-login-button').click()
            cy.contains('Create a new note')
        })

        it('a new note can be created', () => {
            const noteContent = 'a note created by cypress'
            cy.contains('Show').click()
            cy.get('input').type(noteContent)
            cy.contains('Crear nota').click()
            cy.contains(noteContent)
        })
    })
})