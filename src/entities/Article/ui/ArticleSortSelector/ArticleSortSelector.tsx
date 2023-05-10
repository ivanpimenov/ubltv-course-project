import { FC, memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { SelectOption, Select } from '@/shared/ui/Select'
import { SortOrder } from '@/shared/types'
import { ArticleSortField } from '../../model/consts/articleConsts'
import cls from './ArticleSortSelector.module.scss'

interface ArticleSortSelectorProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo((props: ArticleSortSelectorProps) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props
    const { t } = useTranslation()

    const orderOptions = useMemo<SelectOption[]>(
        //  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('ascending'),
            },
            {
                value: 'desc',
                content: t('descending'),
            },
        ],
        [t]
    )

    const sortFieldOptions = useMemo<SelectOption[]>(
        //  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                content: t('creation date'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('name filter'),
            },
            {
                value: ArticleSortField.VIEWS,
                content: t('views'),
            },
        ],
        [t]
    )

    const changeSortHandler = useCallback(
        (newSort: string) => {
            onChangeSort(newSort as ArticleSortField)
        },
        [onChangeSort]
    )

    const changeOrderHandler = useCallback(
        (newOrder: string) => {
            onChangeOrder(newOrder as SortOrder)
        },
        [onChangeOrder]
    )

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select
                options={sortFieldOptions}
                label={t('sort by')}
                value={sort}
                onChange={changeSortHandler}
                //  onChange={onChangeSort}
            />
            <Select
                options={orderOptions}
                label={t('by')}
                value={order}
                onChange={changeOrderHandler}
                //  onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    )
})
