import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'

import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice'
import { loginReducer } from '@/features/AuthByUserName/model/slice/loginSlice'
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice'
import { uiReducer } from '@/features/UI'
import { articleDetailsPageReducer } from '@/pages/ArticleDetailPage/model/slices'
import { articlesPageReducer } from '@/pages/ArticlesPage/model/slices/articlesPageSlice'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

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
