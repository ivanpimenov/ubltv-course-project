import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useTheme } from 'shared/contexts'
import { classNames } from 'shared/lib/classNames/classNames'
import { Portal } from 'shared/ui/Portal/Portal'
import cls from './Modal.module.scss'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose } = props

    const [isClosing, setIsClosing] = useState(false)
    const timeRef = useRef<ReturnType<typeof setTimeout>>()
    // Bad practice
    const {theme} = useTheme()

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timeRef.current = setTimeout(() => {
                onClose()
                setIsClosing(prev => !prev)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    // Новые ссылки !!!
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeHandler()
        },
        [closeHandler]
    )

    const onContentClick = (e: React.MouseEvent) => e.stopPropagation()

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            clearTimeout(timeRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
