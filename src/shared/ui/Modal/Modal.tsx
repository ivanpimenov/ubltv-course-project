import { ReactNode } from 'react'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'
import cls from './Modal.module.scss'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    lazy?: boolean
    onClose?: () => void
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, lazy, onClose } = props
    const { close, isClosing, isOpening, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    })

    const { theme } = useTheme()

    const mods: Mods = {
        [cls.opened]: isOpening,
        [cls.isClosing]: isClosing,
    }

    // const onContentClick = (e: React.MouseEvent) => e.stopPropagation()

    if (lazy && !isMounted) return null

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
                <Overlay onClick={close} />
                <div
                    className={cls.content}
                    // onClick={onContentClick}
                >
                    {children}
                </div>
            </div>
        </Portal>
    )
}
