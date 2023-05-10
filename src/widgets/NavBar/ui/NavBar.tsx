import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { LoginModal } from '@/features/AuthByUserName'
import { getUserAuthData } from '@/entities/User'

import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { Text, TextVariant } from '@/shared/ui/Text'

import { AvatarDropdown } from '@/features/avatarDropdown'
import { NotificationButton } from '@/features/notificationButton'
import { HStack } from '@/shared/ui/Stack'
import { AppRoutes, routerPath } from '@/shared/const/router'
import cls from './NavBar.module.scss'

interface NavBarProps {
    className?: string
}

export const NavBar = memo(({ className }: NavBarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)

    const onClose = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

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
                <HStack gap='16' className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
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
