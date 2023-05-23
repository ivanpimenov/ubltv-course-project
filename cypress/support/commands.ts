/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import * as articleCommands from './commands/article'
import * as commentsCommands from './commands/comments'
import * as commonCommands from './commands/common'
import * as profileCommands from './commands/profile'
import * as ratingCommands from './commands/rating'

Cypress.Commands.addAll(commonCommands)
Cypress.Commands.addAll(profileCommands)
Cypress.Commands.addAll(articleCommands)
Cypress.Commands.addAll(commentsCommands)
Cypress.Commands.addAll(ratingCommands)

// Пример для автогенерирования фикстур
// Cypress.Commands.overwrite('intercept', () => {
//     const FIXTURE_MODE = process.env.FIXTURE_MODE
//     const fixtureName = req.method + req.url + hash(req.body)
//     if (FIXTURE_MODE === 'READ') {
//         // Только считываем данные с существоющих фикстур
//         readFixture(fixtureName)
//     } else if (FIXTURE_MODE === 'WRITE') {
//         // создаем фикстуру на основе данных запроса
//         // cy.intercept('GET', '**/articles/?*', req => {
//         //     req.headers
//         //     req.method
//         //     req.body
//         // })
//         createFixture(fixtureName, req.body)
//     }
// })

export {}
