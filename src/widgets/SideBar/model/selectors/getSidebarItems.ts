import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from '@/entities/User'
import AboutIcon from '@/shared/assets/icons/about-20-20.svg'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'
import MainIcon from '@/shared/assets/icons/main-20-20.svg'
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg'
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router'

import { SideBarItemType } from '../types/sidebar'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SideBarItemType[] = [
        {
            path: getRouteMain(),
            text: 'main',
            Icon: MainIcon,
        },
        {
            path: getRouteAbout(),
            text: 'about',
            Icon: AboutIcon,
        },
    ]

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                text: 'profile',
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                text: 'article',
                Icon: ArticleIcon,
                authOnly: true,
            }
        )
    }

    return sidebarItemsList
})
