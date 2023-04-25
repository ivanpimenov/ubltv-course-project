import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from 'shared/contexts'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
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

    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
    const { theme } = useTheme()

    const mods: Mods = {
        [cls.opened]: isOpening,
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

    // const onContentClick = (e: React.MouseEvent) => e.stopPropagation()

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
            timeRef.current = setTimeout(() => {
                setIsOpening(true)
            }, 0)
        }
        return () => {
            setIsOpening(false)
            clearTimeout(timeRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
        // При размонтировании - убираем Portal из DOM
        return () => setIsMounted(false)
    }, [isOpen])

    if (lazy && !isMounted) return null

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
                <Overlay onClick={closeHandler} />
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
