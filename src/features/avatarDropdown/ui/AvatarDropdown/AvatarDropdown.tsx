import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppRoutes, routerPath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Dropdown } from 'shared/ui/Popups'

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)
    const authData = useSelector(getUserAuthData)

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const isAdminPanelAvailable = isAdmin || isManager

    if (!authData) {
        return null
    }

    return (
        <Dropdown
            direction='bottom left'
            className={classNames('', {}, [className])}
            items={[
                ...(isAdminPanelAvailable
                    ? [
                        {
                            content: t('admin'),
                            href: routerPath[AppRoutes.ADMIN_PANEL],
                        },
                    ]
                    : []),
                {
                    content: t('profile'),
                    href: `${routerPath[AppRoutes.PROFILE]}${authData.id}`,
                },
                {
                    content: t('log out'),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
        />
    )
})