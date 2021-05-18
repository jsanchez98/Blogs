describe('Blog app', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: "jsanch",
            name: "josh sanchez",
            password: "animalito"
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function(){
        cy.contains('log in to application')
    })

    describe('Login', function(){
        it('succeeds with correct credentials', function(){
            cy.get('#username').type('jsanch')
            cy.get('#password').type('animalito')
            cy.get('#login-button').click()

            cy.contains('josh sanchez logged in')
        })

        it('fails with wrong credentials', function(){
            cy.get('#username').type('jsanch')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function(){
        beforeEach(function(){
            cy.request('POST', 'http://localhost:3001/api/login', {
                username:'jsanch', password:'animalito'
            }).then(({body}) => {
                localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function(){
            cy.contains('create new blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('testurl.com')

            cy.get('#createButton').click()

            cy.contains('test blog')
        })

        it('A blog can be liked', function(){
            cy.contains('create new blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('testurl.com')

            cy.get('#createButton').click()
            cy.contains('test blog').parent().contains('view').click()
            cy.get('.likeButton').click()
            cy.contains('likes 1')
        })
    })
})