import React from "react"
import { AppRoutes, routerPath } from "shared/config/routeConfig/routeConfig"
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg'

export interface SideBarItemType {
    path: string
    text: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}

export const SideBarItemsList: SideBarItemType[] = [
    {
        path: routerPath[AppRoutes.MAIN],
        text: 'main',
        Icon: MainIcon,
    },
    {
        path: routerPath[AppRoutes.ABOUT],
        text: 'about',
        Icon: AboutIcon,
    },
    {
        path: routerPath[AppRoutes.PROFILE],
        text: 'profile',
        Icon: ProfileIcon,
        authOnly: true
    },
]