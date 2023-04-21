import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback, useMemo } from 'react'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from '../../model/consts/articleConsts'

interface ArticleTypeTabsProps {
    className?: string
    value: ArticleType
    onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props
    const { t } = useTranslation()

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: t('all'),
            },
            {
                value: ArticleType.IT,
                content: t('it'),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('science'),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('economics'),
            },
        ],
        [t]
    )

    //  const typeTabs = useMemo(
    //      () =>
    //          Object.values(ArticleType).reduce(
    //              (acc: TabItem[], cur) => [...acc, { value: cur, content: t(cur, { ns: 'articles' }) }],
    //              []
    //          ),
    //      [t]
    //  )

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType)
        },
        [onChangeType]
    )

    return <Tabs tabs={typeTabs} value={value} onTabClick={onTabClick} className={classNames('', {}, [className])} />
})
