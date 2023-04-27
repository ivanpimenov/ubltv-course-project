import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

import { validateProfileData } from './validateProfileData'
import { ValidateProfileError } from '../../consts/consts'

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asd',
    currency: Currency.EUR,
}

describe('validateProfileData', () => {
    test('success validation', async () => {
        const result = validateProfileData(data)

        expect(result).toEqual([])
    })

    test('without firstname and lastname', async () => {
        const result = validateProfileData({ ...data, first: '', lastname: '' })

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
    })

    test('incorrect age', async () => {
        const result = validateProfileData({ ...data, age: undefined })

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE])
    })

    test('incorrect country', async () => {
        const result = validateProfileData({ ...data, country: undefined })

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY])
    })

    test('incorrect all', async () => {
        const result = validateProfileData({})

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ])
    })
})
