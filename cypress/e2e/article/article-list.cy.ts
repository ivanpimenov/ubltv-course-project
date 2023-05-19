describe('Пользователь заходит на страницу со списком статьей', () => {
    beforeEach(() => {
        cy.login().then(userData => cy.visit('articles'))
    })
    it('статьи успешно загружаются', () => {
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
    })
})
