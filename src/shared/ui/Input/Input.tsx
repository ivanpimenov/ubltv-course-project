import React, { InputHTMLAttributes, memo, RefObject, useEffect, useRef, useState } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly'>

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    autofocus?: boolean
    readonly?: boolean
    onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
    const { className, value, onChange, autofocus, type = 'text', placeholder, readonly, ...otherProps } = props

    const ref = useRef() as RefObject<HTMLInputElement>
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
        setCaretPosition(e.target.value.length)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const onSelect = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
        if (e.target instanceof HTMLInputElement) setCaretPosition(e?.target?.selectionStart || 0)
    }

    const isCaretVisible = isFocused && !readonly

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true)
            ref?.current?.focus()
        }
    }, [autofocus])

    const mods: Mods = {
        [cls.readonly]: readonly,
    }

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {placeholder && <div className={cls.placeholder}>{`${placeholder}>`}</div>}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    className={cls.input}
                    onChange={onChangeHandler}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isCaretVisible && <span className={cls.caret} style={{ left: `${caretPosition * 9}px` }} />}
            </div>
        </div>
    )
})
