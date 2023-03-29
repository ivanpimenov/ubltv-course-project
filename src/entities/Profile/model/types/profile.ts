import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface Profile {
    id?: string
    first?: string
    lastname?: string
    age?: number
    currency?: Currency
    country?: Country
    city?: string
    username?: string
    avatar?: string
}

export interface ProfileSchema {
    data?: Profile | null
    form?: Profile | null
    isLoading: boolean
    error?: string | null
    readonly: boolean
    validateErrors?: ValidateProfileError[] | null
}
