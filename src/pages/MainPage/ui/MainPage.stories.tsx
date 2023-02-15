import React from 'react'
import { ComponentStory, ComponentMeta, addDecorator } from '@storybook/react'

import { 
    ThemeDecorator 
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/contexts'
import MainPage from './MainPage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Pages/MainPage',
    component: MainPage,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MainPage> = args => (
    <MainPage {...(args as typeof MainPage)} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
