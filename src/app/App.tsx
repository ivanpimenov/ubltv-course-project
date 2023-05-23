import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserInited, userActions } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { NavBar } from '@/widgets/NavBar'
import { SideBar } from '@/widgets/SideBar'

import { AppRouter } from './providers/router'

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
