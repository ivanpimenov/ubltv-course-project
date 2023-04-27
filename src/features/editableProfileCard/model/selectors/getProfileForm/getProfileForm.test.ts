import { StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { getProfileForm } from './getProfileForm'

describe('getProfileData', () => {
    test('should return form from filled state', () => {
        const form = {
            username: 'admin',
            age: 22,
            country: Country.Ukraine,
            lastname: 'ulbi tv',
            first: 'asd',
            city: 'asd',
            currency: Currency.EUR,
        }
        const state: DeepPartial<StateSchema> = {
            profile: {
                form,
            },
        }
        expect(getProfileForm(state as StateSchema)).toEqual(form)
    })

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileForm(state as StateSchema)).toEqual(undefined)
    })
})
