import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'


export interface Profile {
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
}
