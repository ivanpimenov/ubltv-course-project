import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { 
    ThemeDecorator 
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/contexts'
import { Button, ButtonSize, ButtonVariant } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Button',
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    children: 'Text',
}

export const Clear = Template.bind({})
Clear.args = {
    children: 'Text',
    variant: ButtonVariant.CLEAR,
}

export const ClearInverted = Template.bind({})
ClearInverted.args = {
    children: 'Text',
    variant: ButtonVariant.CLEAR_INVERTED,
}

export const Outline = Template.bind({})
Outline.args = {
    children: 'Text',
    variant: ButtonVariant.OUTLINE,
}

export const OutlineSizeL = Template.bind({})
OutlineSizeL.args = {
    children: 'Text',
    variant: ButtonVariant.OUTLINE,
    size: ButtonSize.L,
}

export const OutlineSizeXL = Template.bind({})
OutlineSizeXL.args = {
    children: 'Text',
    variant: ButtonVariant.OUTLINE,
    size: ButtonSize.XL,
}

export const OutlineDark = Template.bind({})
OutlineDark.args = {
    children: 'Text',
    variant: ButtonVariant.OUTLINE,
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Background = Template.bind({})
Background.args = {
    children: 'Text',
    variant: ButtonVariant.BACKGROUND,
}

export const BackgroundInverted = Template.bind({})
BackgroundInverted.args = {
    children: 'Text',
    variant: ButtonVariant.BACKGROUND_INVERTED,
}

export const Square = Template.bind({})
Square.args = {
    children: '>',
    variant: ButtonVariant.BACKGROUND_INVERTED,
    square: true,
}

export const SquareSizeM = Template.bind({})
SquareSizeM.args = {
    children: '>',
    variant: ButtonVariant.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.M,
}

export const SquareSizeL = Template.bind({})
SquareSizeL.args = {
    children: '>',
    variant: ButtonVariant.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.L,
}

export const SquareSizeXL = Template.bind({})
SquareSizeXL.args = {
    children: '>',
    variant: ButtonVariant.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.XL,
}

export const Disabled = Template.bind({})
Disabled.args = {
    children: '>',
    variant: ButtonVariant.OUTLINE,
    disabled: true,
}
