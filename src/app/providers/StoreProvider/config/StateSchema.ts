import { AnyAction, EnhancedStore, ReducersMapObject, Reducer, CombinedState } from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter";
import { UserScheme } from "entities/User";
import { LoginSchema } from "features/AuthByUserName";


export interface StateSchema {
    counter: CounterSchema
    user: UserScheme

    // Async reducers
    loginForm?: LoginSchema
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