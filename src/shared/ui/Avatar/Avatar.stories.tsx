import { ComponentMeta, ComponentStory } from '@storybook/react'

import AvatarImg from '@/shared/assets/tests/storybook.jpg'

import { Avatar } from './Avatar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Avatar',
    component: Avatar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    size: 150,
    src: AvatarImg,
}
export const Small = Template.bind({})
Small.args = {
    size: 50,
    src: AvatarImg,
}
