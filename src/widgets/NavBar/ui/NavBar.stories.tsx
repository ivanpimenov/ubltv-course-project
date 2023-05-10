import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { NavBar } from './NavBar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'widgets/NavBar',
    component: NavBar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NavBar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavBar> = args => <NavBar {...args} />

export const Ligth = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Ligth.args = {}
Ligth.decorators = [StoreDecorator({})]

export const Dark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]

export const AuthNavbar = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AuthNavbar.args = {}
AuthNavbar.decorators = [StoreDecorator({ user: { authData: {} } })]

export const AuthNavbarDark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AuthNavbarDark.args = {}
AuthNavbarDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({ user: { authData: {} } })]
