import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

import { Text, TextSize, TextVariant } from './Text'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Text',
    component: Text,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Text> = args => <Text {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    title: 'Title lorem ipsum',
    text: 'Description Lorem ipsum description',
}

export const Error = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
    title: 'Title lorem ipsum',
    text: 'Description Lorem ipsum description',
    variant: TextVariant.ERROR,
}

export const onlyTitle = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
onlyTitle.args = {
    title: 'Title lorem ipsum',
}

export const onlyText = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
onlyText.args = {
    text: 'Description Lorem ipsum description',
}

export const PrimaryDark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryDark.args = {
    title: 'Title lorem ipsum',
    text: 'Description Lorem ipsum description',
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTitleDark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
onlyTitleDark.args = {
    title: 'Title lorem ipsum',
}
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTextDark = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
onlyTextDark.args = {
    text: 'Description Lorem ipsum description',
}
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeL = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SizeL.args = {
    title: 'Title lorem ipsum',
    text: 'Description Lorem ipsum description',
    size: TextSize.L,
}

export const SizeM = Template.bind({})
SizeM.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: TextSize.M,
}

export const SizeS = Template.bind({})
SizeS.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: TextSize.S,
}
