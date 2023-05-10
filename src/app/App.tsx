import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRouter } from './providers/router'

import { classNames } from '@/shared/lib/classNames/classNames'
import { NavBar } from '@/widgets/NavBar'
import { SideBar } from '@/widgets/SideBar'

import { getUserInited, userActions } from '@/entities/User'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

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
