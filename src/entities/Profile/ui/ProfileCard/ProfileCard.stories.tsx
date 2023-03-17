import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import AvatarImg from 'shared/assets/tests/storybook.jpg'

import {ProfileCard} from './ProfileCard'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'features/ProfileCard',
    component: ProfileCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileCard> = args => <ProfileCard {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Ukraine,
        lastname: 'ulbi tv',
        first: 'asd',
        city: 'asd',
        avatar: AvatarImg,
        currency: Currency.EUR,
    },
}
Primary.decorators = [
    StoreDecorator({
        loginForm: { username: '1234', password: 'asd' },
    }),
]

export const withError = Template.bind({})
withError.args = {
    error: 'true'
}

export const Loading = Template.bind({})
Loading.args = {
    isLoading: true
}

