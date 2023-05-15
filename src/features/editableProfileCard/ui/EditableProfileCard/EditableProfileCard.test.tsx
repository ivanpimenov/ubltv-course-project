import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Profile } from '@/entities/Profile'
import { $api } from '@/shared/api/api'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

import { EditableProfileCard } from './EditableProfileCard'
import { profileReducer } from '../../model/slice/profileSlice'

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Moscow',
    username: 'admin213',
}

const options = {
    initialState: {
        profile: {
            readonly: true,
            // data: profile,
            // form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
}

describe('features/EditableProfileCard', () => {
    beforeEach(async () => {
        const mockGetReq = jest.spyOn($api, 'get').mockReturnValue(Promise.resolve({ data: { ...profile } }))
        componentRender(<EditableProfileCard id='1' />, options)
    })
    test('Режим рид онли должен переключиться', async () => {
        const editButton = await screen.findByTestId('EditableProfileCardHeader.EditButton')
        await userEvent.click(editButton)

        const cancelButton = await screen.findByTestId('EditableProfileCardHeader.CancelButton')
        expect(cancelButton).toBeInTheDocument()
    })

    test('При отмене значения должны обнуляться', async () => {
        await userEvent.click(await screen.findByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(await screen.findByTestId('ProfileCard.firstname'))
        await userEvent.clear(await screen.findByTestId('ProfileCard.lastname'))

        await userEvent.type(await screen.findByTestId('ProfileCard.firstname'), 'user')
        await userEvent.type(await screen.findByTestId('ProfileCard.lastname'), 'user')

        expect(await screen.findByTestId('ProfileCard.firstname')).toHaveValue('user')
        expect(await screen.findByTestId('ProfileCard.lastname')).toHaveValue('user')

        await userEvent.click(await screen.getByTestId('EditableProfileCardHeader.CancelButton'))

        expect(await screen.findByTestId('ProfileCard.firstname')).toHaveValue('admin')
        expect(await screen.findByTestId('ProfileCard.lastname')).toHaveValue('admin')
    })

    test('Должна появиться ошибка', async () => {
        await userEvent.click(await screen.findByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(await screen.findByTestId('ProfileCard.firstname'))

        await userEvent.click(await screen.findByTestId('EditableProfileCardHeader.SaveButton'))

        expect(await screen.findByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
    })

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put')
        await userEvent.click(await screen.findByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.type(await screen.findByTestId('ProfileCard.firstname'), 'user')

        await userEvent.click(await screen.findByTestId('EditableProfileCardHeader.SaveButton'))

        expect(mockPutReq).toHaveBeenCalled()
    })
})
