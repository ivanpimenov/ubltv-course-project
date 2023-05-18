import { selectByTestId } from '../../helpers/selectByTestId'

describe('Роутинг', () => {
    describe('Пользователь НЕ авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/')
            cy.get(selectByTestId('MainPage')).should('exist')
        })

        it('Открывает страницу профиля', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('MainPage')).should('exist')
        })

        it('Открывает не существующую страницу', () => {
            cy.visit('/some-path')
            cy.get(selectByTestId('NotFoundPage')).should('exist')
        })
    })
    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login()
        })

        it('Открывает страницу профиля', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('ProfilePage')).should('exist')
        })

        it('Открывает страницу со списком статьей', () => {
            cy.visit('/articles')
            cy.get(selectByTestId('ArticlesPage')).should('exist')
        })
    })
})
