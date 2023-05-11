import { ButtonHTMLAttributes, memo, ReactNode } from 'react'

import { classNames, Mods } from '@/shared/lib/classNames/classNames'

import cls from './Button.module.scss'

export enum ButtonVariant {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    /**
     * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
     */
    variant?: ButtonVariant
    /**
     * Флаг, делающий кнопку квадратной
     */
    square?: boolean
    /**
     * Размер кнопки в соответствии с дизайн системой
     */
    size?: ButtonSize
    /**
     * Флаг, отвечающий за работу кнопки
     */
    disabled?: boolean
    /**
     * Увеличивает кнопку на всю свободную ширину
     */
    fullWidth?: boolean
     /**
     * Содержимое кнопки
     */
    children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = ButtonVariant.OUTLINE,
        square,
        size = ButtonSize.M,
        disabled,
        fullWidth,
        ...otherProps
    } = props

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
    }

    return (
        <button
            type='button'
            disabled={disabled}
            className={classNames(cls.Button, mods, [cls[variant], cls[size], className])}
            {...otherProps}
        >
            {children}
        </button>
    )
})
