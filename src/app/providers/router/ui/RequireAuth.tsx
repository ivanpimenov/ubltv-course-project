import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User'
import { routerPath } from '@/shared/config/routeConfig/routeConfig'

interface RequireAuthProps {
    children: JSX.Element
    roles?: UserRole[]
}

export const RequireAuth = function ({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData)
    const location = useLocation()
    const userRoles = useSelector(getUserRoles)

    const hasRequiredRoles = useMemo(() => {
        if (!roles) return true
        return roles.some(requiredRole => userRoles?.includes(requiredRole))
    }, [roles, userRoles])

    if (!auth)
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to={routerPath.main} state={{ from: location }} replace />

    if (!hasRequiredRoles) return <Navigate to={routerPath.forbidden} state={{ from: location }} replace />

    return children
}
