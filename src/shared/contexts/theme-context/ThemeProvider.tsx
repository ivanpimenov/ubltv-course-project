import { FC, useMemo, useState } from 'react'
import { LOCAL_STORAGE_THEME, Theme, ThemeContext } from './ThemeContext'

const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME) as Theme) || Theme.LIGHT

interface ThemeProviderProps {
    initialTheme?: Theme
}

const ThemeProvider: FC<ThemeProviderProps> = props => {
    const { children, initialTheme } = props
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)
    document.body.className = theme
    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
