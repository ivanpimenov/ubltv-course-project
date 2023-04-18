import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/contexts'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { EditableProfileCard } from './EditableProfileCard'

export default {
    title: 'features/editableProfileCard/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCard>

const Template: ComponentStory<typeof EditableProfileCard> = args => <EditableProfileCard {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
    StoreDecorator({
        profile: {
            form: {
                username: 'admin',
                age: 22,
                country: Country.Ukraine,
                lastname: 'ulbi tv',
                first: 'asd',
                city: 'asd',
                currency: Currency.EUR,
            },
        },
    }),
]

export const Dark = Template.bind({})
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                username: 'admin',
                age: 22,
                country: Country.Ukraine,
                lastname: 'ulbi tv',
                first: 'asd',
                city: 'asd',
                currency: Currency.EUR,
            },
        },
    }),
]

