import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'

import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { uiReducer } from '@/features/UI'
// TODO

// eslint-disable-next-line ivp-fsd-path-checker-plugin/ivp-fsd-public-api-imports
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'
// eslint-disable-next-line ivp-fsd-path-checker-plugin/ivp-fsd-public-api-imports
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice'
// eslint-disable-next-line ivp-fsd-path-checker-plugin/ivp-fsd-public-api-imports
import { loginReducer } from '@/features/AuthByUserName/model/slice/loginSlice'
// eslint-disable-next-line ivp-fsd-path-checker-plugin/ivp-fsd-public-api-imports
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice'
// eslint-disable-next-line ivp-fsd-path-checker-plugin/ivp-fsd-public-api-imports
import { articleDetailsPageReducer } from '@/pages/ArticleDetailPage/model/slices'
// eslint-disable-next-line ivp-fsd-path-checker-plugin/ivp-fsd-public-api-imports
import { articlesPageReducer } from '@/pages/ArticlesPage/model/slices/articlesPageSlice'

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
