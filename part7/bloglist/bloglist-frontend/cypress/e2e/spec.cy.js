describe('Blog app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:5173/')
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        const user = {
            name: 'lija',
            username: 'lija',
            password: 'lija123',
        }
        cy.request('POST', 'http://localhost:3000/api/users', user)
        cy.contains('login').click()
    })

    it('Login form is shown', function () {
        cy.get('#login-form')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('lija')
            cy.get('#password').type('lija123')
            cy.get('#login-btn').click()

            cy.contains('login success')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('lijaa')
            cy.get('#password').type('lija')
            cy.get('#login-btn').click()

            cy.get('.error').should('contain', 'Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'lija', password: 'lija123' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('First blog')
            cy.get('#url').type('www.first.blog')
            cy.get('#author').type('Author First')

            cy.get('#create-btn').click()
            cy.contains('First blog')
        })

        describe('Several Blog exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: "New Blog", url: "www.link1.com",author:"First One" })
                cy.createBlog({ title: "New Blog2", url: "www.link2.com",author:"Second One" })
                cy.createBlog({ title: "New Blog3", url: "www.link3.com",author:"Third One" })
            })

            it('User can like a blog', function () {
                cy.contains('New Blog2').parent().find('#view-btn').click()
                cy.contains('likes 0')
                cy.get('#like-btn').click()
                cy.contains('likes 1')
                cy.contains('Blog liked')
            })


            it('User can delete a blog', function () {
                cy.contains('New Blog2').parent().find('#view-btn').click()
                
                cy.get('#delete-btn').click()
                cy.contains('New Blog2').should('not.exist')

                cy.contains('Blog deleted')
            })

            it('Only the creator can see the delete button of a blog', function () {
                cy.contains('logout').click()

                const user = {
                    name: 'lija2',
                    username: 'lija2',
                    password: 'lija123',
                }
                cy.request('POST', 'http://localhost:3000/api/users', user)

                cy.login({ username: 'lija2', password: 'lija123' })

                cy.contains('New Blog2').parent().find('#view-btn').click()
                cy.get('#delete-btn').should('not.exist')
            })

            it(' blogs are ordered by likes', function () {
                cy.contains('New Blog').parent().parent().find('#view-btn').click()
                cy.contains('New Blog').parent().parent().find('#like-btn').as('BlogOneLike')
                cy.get('@BlogOneLike').click()
                cy.wait(1000)
                cy.get('@BlogOneLike').click()
                cy.wait(1000)

                cy.contains('New Blog2').parent().parent().find('#view-btn').click()
                cy.contains('New Blog2').parent().parent().find('#like-btn').as('BlogTwoLike')
                cy.get('@BlogTwoLike').click()
                cy.wait(1000)
                cy.get('@BlogTwoLike').click()
                cy.wait(1000)
                cy.get('@BlogTwoLike').click()
                cy.wait(1000)

                cy.contains('New Blog3').parent().parent().find('#view-btn').click()
                cy.contains('New Blog3').parent().parent().find('#like-btn').as('BlogThreeLike')
                cy.get('@BlogThreeLike').click()
                cy.wait(1000)

                cy.get('.blog').eq(0).should('contain', 'New Blog2')
                cy.get('.blog').eq(1).should('contain', 'New Blog')
                cy.get('.blog').eq(2).should('contain', 'New Blog3')
            })
        })
    })
})