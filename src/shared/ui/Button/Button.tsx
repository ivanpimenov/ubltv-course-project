import { ButtonHTMLAttributes, FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonVariant {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
}

export const Button: FC<ButtonProps> = (props) => {
    const { className, children, variant, ...otherProps } = props
    return (
        <button className={classNames(cls.Button, {}, [cls[variant], className])} {...otherProps}>
            {children}
        </button>
    )
}
