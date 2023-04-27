import { ChangeEvent, memo, useMemo } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOption {
    // export interface SelectOption<T extends string> {
    value: string
    // value: T
    content: string
}

interface SelectProps {
    // interface SelectProps<T extends string> {
    className?: string
    label?: string
    options?: SelectOption[]
    // options?: SelectOption<T>[]
    value?: string
    // value?: T
    readonly?: boolean
    onChange?: (value: string) => void
    // onChange?: (value: T) => void
}

export const Select = memo((props: SelectProps) => {
    // export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, label, options, value, readonly, onChange } = props

    const optionList = useMemo(
        () =>
            options?.map(opt => (
                <option className={cls.option} value={opt.value} key={opt.value}>
                    {opt.content}
                </option>
            )),
        [options]
    )

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
        // onChange?.(e.target.value as T)
    }

    const mods: Mods = {}

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <select disabled={readonly} className={cls.select} value={value} onChange={onChangeHandler}>
                {optionList}
            </select>
        </div>
    )
})
// }
