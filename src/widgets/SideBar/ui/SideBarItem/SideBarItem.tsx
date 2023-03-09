import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { AppRoutes, routerPath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { SideBarItemType } from '../../model/items'
import cls from './SideBarItem.module.scss'

interface SideBarItemProps {
    item: SideBarItemType
    collapsed: boolean
}

export const SideBarItem = memo((props: SideBarItemProps) => {
    const { item, collapsed } = props
    const { t } = useTranslation()

    return (
        <AppLink
            to={item.path}
            theme={AppLinkTheme.SECONDARY}
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    )
})
