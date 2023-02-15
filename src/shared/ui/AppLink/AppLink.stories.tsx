import React from 'react'
import { ComponentStory, ComponentMeta, addDecorator } from '@storybook/react'

import { 
    ThemeDecorator 
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/contexts'
import { AppLink, AppLinkTheme } from './AppLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/AppLink',
    component: AppLink,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    }
} as ComponentMeta<typeof AppLink>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppLink> = args => <AppLink {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    theme: AppLinkTheme.PRIMARY,
    children: 'Link text'
}

export const Secondary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary.args = {
    theme: AppLinkTheme.SECONDARY,
    children: 'Link text',
}

export const PrimaryDark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryDark.args = {
    theme: AppLinkTheme.PRIMARY,
    children: 'Link text',
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]


export const SecondaryDark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SecondaryDark.args = {
    theme: AppLinkTheme.SECONDARY,
    children: 'Link text',
}
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]

