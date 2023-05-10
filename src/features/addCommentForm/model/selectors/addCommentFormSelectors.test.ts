import { StateSchema } from '@/app/providers/StoreProvider'

import { getAddCommentFormError, getAddCommentFormText } from './addCommentFormSelectors'

describe('addCommentFormSelectors', () => {
    test('should getAddCommentFormText return text', () => {
        const data = {
            text: 'some text',
            error: undefined,
        }
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                ...data,
            },
        }
        expect(getAddCommentFormText(state as StateSchema)).toEqual(data.text)
    })
    test('getAddCommentFormText should work with empty state data', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getAddCommentFormText(state as StateSchema)).toEqual('')
    })
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                error: 'error',
            },
        }
        expect(getAddCommentFormError(state as StateSchema)).toEqual('error')
    })
    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined)
    })
})
