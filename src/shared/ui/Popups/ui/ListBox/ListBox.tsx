import { Fragment, ReactNode, useState } from 'react'
import { Listbox as HListbox } from '@headlessui/react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { DropdownDirection } from 'shared/types/ui'
import { HStack } from '../../../Stack'
import { Button } from '../../../Button/Button'
import { mapDirectionClass } from '../../styles/consts'
import cls from './ListBox.module.scss'
import popupCls from '../../styles/popup.module.scss'

export interface ListboxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface ListboxProps {
    items?: ListboxItem[]
    className?: string
    value?: string
    defaultValue?: string
    onChange: (value: string) => void
    readonly?: boolean
    direction?: DropdownDirection
    label?: string
}

export const ListBox = (props: ListboxProps) => {
    const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom right', label } = props

    const optionsClasses = [mapDirectionClass[direction]]

    return (
        <HStack gap='4'>
            {label && <span>{`${label}>`}</span>}
            <HListbox
                disabled={readonly}
                as='div'
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
            >
                <HListbox.Button
                    as='div'
                    // disabled={readonly}
                    className={cls.trigger}
                >
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListbox.Button>
                <HListbox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map(item => (
                        <HListbox.Option key={item.value} value={item.value} disabled={item.disabled} as={Fragment}>
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                    })}
                                >
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>
    )
}
