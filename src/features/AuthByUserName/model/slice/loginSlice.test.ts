import { loginActions, loginReducer } from './loginSlice'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'
import { LoginSchema } from '../types/LoginSchema'

describe('loginSlice', () => {
    test('set username', () => {
        const state: DeepPartial<LoginSchema> = { username: 'user' }
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('admin'))).toEqual({ username: 'admin' })
    })

    test('set password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' }
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('12345'))).toEqual({ password: '12345' })
    })

    test('test login service fulfilled', () => {
        const state: DeepPartial<LoginSchema> = {
            isLoading: true,
        }

        expect(
            loginReducer(
                state as LoginSchema,
                loginByUsername.fulfilled({ username: 'admin', id: '1' }, '', { username: 'admin', password: '123' })
            )
        ).toEqual({
            isLoading: false,
        })
    })
})
