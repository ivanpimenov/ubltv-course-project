export type { UserScheme, User } from './model/types/user'
export { UserRole } from './model/consts/userConsts'

export {
    getUserRoles,
    isUserAdmin,
    isUserManager,
} from './model/selectors/roleSelectors'
export { getUserInited } from './model/selectors/getUserInited/getUserInited'
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'
export { userActions, userReducer } from './model/slice/userSlice'
