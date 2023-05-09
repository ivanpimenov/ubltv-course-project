import { memo, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button/Button'

import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { LangSwitcher } from '@/widgets/LangSwitcher'
import { VStack } from '@/shared/ui/Stack'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SideBarItem } from '../SideBarItem/SideBarItem'
import cls from './SideBar.module.scss'

interface SideBarProps {
    className?: string
}

export const SideBar = memo(({ className }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const SideBarItemsList = useSelector(getSidebarItems)

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    const itemsList = useMemo(
        () => SideBarItemsList.map(item => <SideBarItem item={item} collapsed={collapsed} key={item.path} />),
        [collapsed, SideBarItemsList]
    )

    return (
        <section className={classNames(cls.SideBar, { [cls.collapsed]: collapsed }, [className])} data-testid='sidebar'>
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

            <VStack role='navigation' gap='8' className={cls.items}>
                {itemsList}
            </VStack>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </section>
    )
})
