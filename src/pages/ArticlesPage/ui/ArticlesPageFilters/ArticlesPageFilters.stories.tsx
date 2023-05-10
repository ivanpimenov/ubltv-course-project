import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

import { ArticlesPageFilters } from './ArticlesPageFilters'

export default {
    title: 'pages/ArticlesPage/ArticlesPageFilters',
    component: ArticlesPageFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPageFilters>

const Template: ComponentStory<typeof ArticlesPageFilters> = args => <ArticlesPageFilters {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
    StoreDecorator({
        articlesPage: {
            view: ArticleView.BIG,
            sort: ArticleSortField.VIEWS,
            search: '',
            order: 'asc',
            type: ArticleType.ALL,
        },
    }),
]
