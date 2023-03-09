import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'

export enum TextVariant {
    PRIMARY = 'primary',
    ERROR = 'error',
}

interface TextProps {
    className?: string
    title?: string
    text?: string
    variant?: TextVariant
}

export const Text = memo((props: TextProps) => {
    const { className, title, text, variant = TextVariant.PRIMARY } = props

    return (
        <div className={classNames(cls.Text, {}, [className, cls[variant]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    )
})
