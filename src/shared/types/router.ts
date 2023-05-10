import { RouteProps } from 'react-router-dom'
// eslint-disable-next-line ivp-fsd-path-checker-plugin/ivp-fsd-layer-imports
import { UserRole } from '@/entities/User'

export type AppRouteProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}
