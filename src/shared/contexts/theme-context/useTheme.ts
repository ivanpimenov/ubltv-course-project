import { useContext } from 'react'
import { LOCAL_STORAGE_THEME, Theme, ThemeContext } from './ThemeContext'

interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        // const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        let newTheme: Theme
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT
            break
        case Theme.LIGHT:
            newTheme = Theme.ORANGE
            break
        case Theme.ORANGE:
            newTheme = Theme.DARK
            break
        default:
            newTheme = Theme.LIGHT
            break
        }
        setTheme?.(newTheme)
        document.body.className = newTheme
        localStorage.setItem(LOCAL_STORAGE_THEME, newTheme)
    }

    return { theme: theme || Theme.LIGHT, toggleTheme }
}
