import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
    keepMounted?: boolean
    element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
    const { children, element = document.body, keepMounted = true } = props
    return keepMounted ? createPortal(children, element) : null
}
