let profileId = ''

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('')
        cy.login().then(userData => {
            profileId = userData.id
            cy.visit(`profile/${userData.id}`)
        })
    })
    afterEach(() => {
        cy.resetProfile(profileId)
    })
    it('профиль успешно загружен', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'test')
    })
    it('редактирует его', () => {
        const newName = 'new'
        const newLastname = 'lastname'
        cy.updateProfile(newName, newLastname)
        cy.getByTestId('ProfileCard.firstname').should('have.value', newName)
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
    })
})
