import { AppRouter } from 'app/providers/router'
import { useTheme } from 'shared/contexts'
import { classNames } from 'shared/lib/classNames/classNames'
import { NavBar } from 'widgets/NavBar'
import { SideBar } from 'widgets/SideBar'

import { Suspense } from 'react'

const App = function () {
    const { theme } = useTheme()

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback=''>
                <NavBar />
                <div className='content-page'>
                    <SideBar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
