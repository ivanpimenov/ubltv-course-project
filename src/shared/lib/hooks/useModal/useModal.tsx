import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

interface UseModalProps {
    onClose?: () => void
    isOpen?: boolean
    animationDelay: number
}

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param animationDelay
 * @param isOpen
 * @param onClose
 */
export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timeRef.current = setTimeout(() => {
                onClose()
                setIsClosing(prev => !prev)
            }, animationDelay)
        }
    }, [onClose, animationDelay])

    // Новые ссылки !!!
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        },
        [close]
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

    return {
        isClosing,
        isOpening,
        isMounted,
        close,
    }
}
