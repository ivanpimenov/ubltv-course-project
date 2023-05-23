import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

import LoginForm from './LoginForm'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'features/LoginForm',
    component: LoginForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoginForm> = (args) => (
    <LoginForm {...args} />
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
Primary.decorators = [
    StoreDecorator({
        loginForm: { username: '1234', password: 'asd' },
    }),
]

export const withError = Template.bind({})
withError.args = {}
withError.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: 'asd', error: 'ERROR' },
    }),
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
    StoreDecorator({
        loginForm: { isLoading: true },
    }),
]
