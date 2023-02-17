import { ButtonHTMLAttributes, FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonVariant {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
    square?: boolean
    size?: ButtonSize
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

export const Button: FC<ButtonProps> = props => {
    const {
        className,
        children,
        variant,
        square,
        size = ButtonSize.M,
        ...otherProps
    } = props

    const mods: Record<string, boolean> = {
        [cls.square]: square,
    }

    return (
        <button
            type='button'
            className={classNames(cls.Button, mods, [cls[variant], cls[size], className])}
            {...otherProps}
        >
            {children}
        </button>
    )
}
