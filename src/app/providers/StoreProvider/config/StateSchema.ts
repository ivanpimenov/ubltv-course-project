import { CounterSchema } from "entities/Counter";
import { UserScheme } from "entities/User";
import { LoginSchema } from "features/AuthByUserName";


export interface StateSchema {
    counter: CounterSchema
    user: UserScheme
    loginForm?: LoginSchema
}
