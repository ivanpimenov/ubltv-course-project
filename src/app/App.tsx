import { AppRouter } from 'app/providers/router'
import { useTheme } from 'shared/contexts'
import { classNames } from 'shared/lib/classNames/classNames'
import { NavBar } from 'widgets/NavBar'
import { SideBar } from 'widgets/SideBar'

import { getUserInited, userActions } from 'entities/User'
import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = function () {
    const { theme } = useTheme()
    const dispatch = useDispatch()
    const inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback=''>
                <NavBar />
                <div className='content-page'>
                    <SideBar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    )
}

export default App
