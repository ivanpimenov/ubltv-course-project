import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { routerPath, AppRoutes } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import cls from './SideBar.module.scss'

interface SideBarProps {
    className?: string
}

export const SideBar = ({ className }: SideBarProps) => {
    const { t } = useTranslation()
    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div
            className={classNames(cls.SideBar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
            data-testid='sidebar'
        >
            <Button
                data-testid='sidebar-toggle'
                onClick={onToggle}
                className={cls.collapsedBtn}
                variant={ButtonVariant.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>

            <div className={cls.items}>
                <AppLink
                    to={routerPath[AppRoutes.MAIN]}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.item}
                >
                    <MainIcon className={cls.icon} />
                    <span className={cls.link}>{t('main')}</span>
                </AppLink>

                <AppLink
                    to={routerPath[AppRoutes.ABOUT]}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.item}
                >
                    <AboutIcon className={cls.icon} />
                    <span className={cls.link}>{t('about')}</span>
                </AppLink>
            </div>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </div>
    )
}
