import { DeepPartial } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/LoginSchema'
import { loginActions, loginReducer } from './loginSlice'

describe('loginSlice', () => {
    test('set username', () => {
        const state: DeepPartial<LoginSchema> = { username: 'user' }
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('admin'))).toEqual({ username: 'admin' })
    })

    test('set password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' }
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('12345'))).toEqual({ password: '12345' })
    })
})
