import { memo, ReactNode, useCallback } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Tabs.module.scss'

import { Card, CardVariant } from '../Card/Card'

export interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps {
    className?: string
    tabs: TabItem[]
    value: string
    onTabClick: (tab: TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {
    const { className, tabs, onTabClick, value } = props

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab)
        },
        [onTabClick]
    )

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    variant={
                        tab.value === value
                            ? CardVariant.NORMAL
                            : CardVariant.OUTLINED
                    }
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    )
})
