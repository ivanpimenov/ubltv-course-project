import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { uiReducer } from '@/features/UI'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { addCommentFormReducer } from '@/features/addCommentForm/testing'
import { loginReducer } from '@/features/AuthByUserName/testing'
import { profileReducer } from '@/features/editableProfileCard/testing'
import { articleDetailsPageReducer } from '@/pages/ArticleDetailPage/testing'
import { articlesPageReducer } from '@/pages/ArticlesPage/testing'

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    // articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsPage: articleDetailsPageReducer,
    articlesPage: articlesPageReducer,
    ui: uiReducer,
}

export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) =>
        (
            <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
                <StoryComponent />
            </StoreProvider>
        )
