import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileIsLoading } from './getProfileIsLoading'

describe('getProfileIsLoading', () => {
    test('should return isLoading from filled state', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: false,
            },
        }
        expect(getProfileIsLoading(state as StateSchema)).toBeFalsy()
    })

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined)
    })
})
