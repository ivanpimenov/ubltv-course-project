let currentArticleId = ''
describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        cy.login()
        cy.createArticle().then(article => {
            currentArticleId = article.id
            cy.visit(`articles/${article.id}`)
        })
    })
    afterEach(() => {
        cy.removeArticle(currentArticleId)
    })

    // describe('Работа с API', () => {})
    // describe('Работа с Фикстурами', () => {})

    it('видит содержимое статьи', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist')
    })
    it('видит cписок рекомендаций статьи', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist')
    })
    it('оставляет комментарий', () => {
        cy.getByTestId('ArticleDetails.Info')
        cy.getByTestId('AddCommentForm').scrollIntoView()
        cy.addComment('test comment text')
        cy.getByTestId('CommentCard.Content').should('have.length', 1)
    })

    it('ставит оценку ', () => {
        cy.getByTestId('ArticleDetails.Info')
        cy.getByTestId('RatingCard').scrollIntoView()
        cy.setRate(4, 'some test feedback')
        cy.get('[data-selected=true]').should('have.length', 4)
    })
    it('(Пример со стаб запросом (фикстура)), ставит оценку ', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' })
        cy.getByTestId('ArticleDetails.Info')
        cy.getByTestId('RatingCard').scrollIntoView()
        cy.setRate(4, 'some test feedback')
        cy.get('[data-selected=true]').should('have.length', 4)
    })
})
