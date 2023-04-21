import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User'
import { LoginModal } from 'features/AuthByUserName'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'
import { Text, TextVariant } from 'shared/ui/Text/Text'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { AppRoutes, routerPath } from 'shared/config/routeConfig/routeConfig'

import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import cls from './NavBar.module.scss'

interface NavBarProps {
    className?: string
}

export const NavBar = memo(({ className }: NavBarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const dispatch = useDispatch()
    const authData = useSelector(getUserAuthData)
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)

    const onClose = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const isAdminPanelAvailable = isManager || isAdmin

    if (authData) {
        return (
            <header className={classNames(cls.NavBar, {}, [className])}>
                <Text className={cls.appName} title={t('Ulbi TV App')} variant={TextVariant.INVERTED} />
                <AppLink
                    to={routerPath[AppRoutes.ARTICLE_CREATE]}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.createBtn}
                >
                    {t('create article')}
                </AppLink>
                <Dropdown
                    direction='bottom left'
                    className={cls.dropdown}
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
                {/* <Button variant={ButtonVariant.CLEAR_INVERTED} className={cls.links} onClick={onLogout}>
                    {t('log out')}
                </Button> */}
            </header>
        )
    }

    return (
        <header className={classNames(cls.NavBar, {}, [className])}>
            <Button variant={ButtonVariant.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
                {t('log in')}
            </Button>

            <LoginModal isOpen={isAuthModal} onClose={onClose} />
        </header>
    )
})
