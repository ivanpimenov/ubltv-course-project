import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'
import { Country } from '../../model/types/country'

interface CountrySelectProps {
    className?: string
    value?: Country
    readonly?: boolean
    onChange?: (value: Country) => void
}

// const options = Object.entries(Country).map(val => ({ value: val[0], content: val[1] }))
const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Ukraine, content: Country.Ukraine },
]

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, readonly, onChange } = props
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country)
        },
        [onChange]
    )

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('select country')}
            value={value}
            options={options}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    )
})
