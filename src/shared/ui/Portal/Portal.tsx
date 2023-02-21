import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
    keepMounted?: boolean
    element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
    const { children, element = document.body, keepMounted = true } = props
    return keepMounted ? createPortal(children, element) : null
    // const ref = useRef()
    // const [mounted, setMounted] = useState(false)

    // useEffect(() => {
    //     ref.current = document.querySelector('#root') || undefined
    //     setMounted(true)
    // }, [])

    // return mounted && ref.current ? createPortal(children, ref.current) : null
}
