describe('Пользователь заходит на страницу со списком статьей', () => {
    beforeEach(() => {
        cy.login().then((userData) => cy.visit('articles'))
    })
    it('статьи успешно загружаются', () => {
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
    })

    it('Стаб запрос (вернет фикстуру/моковые данные)', () => {
        cy.intercept('GET', '**/articles/?*', { fixture: 'articles.json' })
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
    })

    it.skip('Сломаный тест, пример SKIPa', () => {
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
        cy.getByTestId('sadfdsfqwe').should('exist')
    })
})
