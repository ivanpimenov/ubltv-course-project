import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { 
    ThemeDecorator
} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/contexts'
import { PageError } from './PageError'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'widget/PageError',
    component: PageError,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageError>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PageError> = args => (
    <PageError {...args} />
)

export const Ligth = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Ligth.args = {}

export const Dark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
