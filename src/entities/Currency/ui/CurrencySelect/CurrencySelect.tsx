import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { Currency } from '../../model/types/currency'

interface CurrencySelectProps {
    className?: string
    value?: Currency
    readonly?: boolean
    onChange?: (value: Currency) => void
}

// const options = Object.entries(Currency).map(val => ({ value: val[0], content: val[1] }))
const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { className, value, readonly, onChange } = props
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency)
        },
        [onChange]
    )

    return (
        <ListBox
            className={className}
            value={value}
            defaultValue={t('select currency')}
            label={t('select currency')}
            items={options}
            onChange={onChangeHandler}
            readonly={readonly}
            direction='top'
        />
        // <Select
        //     className={classNames('', {}, [className])}
        //     label={t('select currency')}
        //     value={value}
        //     options={options}
        //     onChange={onChangeHandler}
        //     readonly={readonly}
        // />
    )
})
