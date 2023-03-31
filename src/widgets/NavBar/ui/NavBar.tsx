import { getUserAuthData, userActions } from 'entities/User'
import { LoginModal } from 'features/AuthByUserName'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'
import cls from './NavBar.module.scss'

interface NavBarProps {
    className?: string
}

export const NavBar = memo(({ className }: NavBarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const dispatch = useDispatch()
    const authData = useSelector(getUserAuthData)

    const onClose = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    if (authData) {
        return (
            <header className={classNames(cls.NavBar, {}, [className])}>
                <Button variant={ButtonVariant.CLEAR_INVERTED} className={cls.links} onClick={onLogout}>
                    {t('log out')}
                </Button>
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
