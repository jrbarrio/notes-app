describe('Note App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');

        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            user: 'Jorge',
            username: 'jorge',
            password: 'psw'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user)
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

    it('login fails with wrong password', () => {
        cy.contains('Show').click()
        cy.get('[placeholder="Username"]').type('jorge')
        cy.get('[placeholder="Password"]').type('pswd')
        cy.get('#form-login-button').click()
        
        cy.get('.error').contains('Wrong login')
    })

    describe('when logged in', () => {
        beforeEach(() => {
            cy.contains('Show').click()
            cy.get('[placeholder="Username"]').type('jorge')
            cy.get('[placeholder="Password"]').type('psw')
            cy.get('#form-login-button').click()
            cy.contains('Create a new note')

        //    cy.login({username: 'jorge',password: 'psw'})           
        })

        it('a new note can be created', () => {
            const noteContent = 'a note created by cypress'
            cy.contains('Show').click()
            cy.get('input').type(noteContent)
            cy.contains('Crear nota').click()
            cy.contains(noteContent)
        })

        describe('and a note exists', () => {
            beforeEach(() => {
                cy.createNote('A note created from cypress', false) 
            })

            it('can be made important', () => {
                cy.contains('A note created from cypress').contains('make important')
            })
        })
    })
})