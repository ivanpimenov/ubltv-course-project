import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useNotifications } from '../../api/notificationApi'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import cls from './NotificationList.module.scss'

interface NotificationListProps {
    className?: string
}

export const NotificationList: FC<NotificationListProps> = memo((props: NotificationListProps) => {
    const { className } = props
    const { t } = useTranslation()
    const { data: notifications, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    })

    if (isLoading) {
        return (
            <VStack gap='16' max className={classNames(cls.NotificationList, {}, [className])}>
                <Skeleton width='100%' border='8px' height='80px' />
                <Skeleton width='100%' border='8px' height='80px' />
                <Skeleton width='100%' border='8px' height='80px' />
            </VStack>
        )
    }

    return (
        <VStack gap='16' max className={classNames(cls.NotificationList, {}, [className])}>
            {notifications?.map(notification => (
                <NotificationItem key={notification.id} item={notification} />
            ))}
        </VStack>
    )
})
