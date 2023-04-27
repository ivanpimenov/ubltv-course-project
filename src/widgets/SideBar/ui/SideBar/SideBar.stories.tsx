import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { 
    ThemeDecorator
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/contexts'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { SideBar } from './SideBar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'widget/SideBar',
    component: SideBar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SideBar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SideBar> = args => <SideBar {...args} />

export const Ligth = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Ligth.args = {}
Ligth.decorators = [
    StoreDecorator({
        user: { authData: {} },
    }),
]

export const Dark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {}
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: {authData: {}}
    })
]

export const NoAuth = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoAuth.args = {}
NoAuth.decorators = [
    StoreDecorator({
        user: {},
    }),
]