import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ArticleDetailsSchema } from 'entities/Article'
import { CounterSchema } from 'entities/Counter'
import { UserScheme } from 'entities/User'
import { AddCommentFormSchema } from 'features/addCommentForm'
import { LoginSchema } from 'features/AuthByUserName'
import { ProfileSchema } from 'features/editableProfileCard'
import { UISchema } from 'features/UI'
import {
    ArticleDetailsCommentsSchema,
    ArticleDetailsPageSchema,
    ArticleDetailsRecommendationsSchema,
} from 'pages/ArticleDetailPage'
import { ArticlesPageSchema } from 'pages/ArticlesPage'
import { rtkApi } from 'shared/api/rtkApi'

export interface StateSchema {
    counter: CounterSchema
    user: UserScheme
    ui: UISchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // Async reducers
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    addCommentForm?: AddCommentFormSchema
    articlesPage?: ArticlesPageSchema
    articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
