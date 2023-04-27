import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/contexts'
import ProfilePage from './ProfilePage'

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        router: {
            path: '/profile/:id',
            route: '/profile/1',
        },
    },
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = args => <ProfilePage {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [
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
Primary.args = {}
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
