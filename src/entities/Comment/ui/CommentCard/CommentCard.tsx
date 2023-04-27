import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { AppRoutes, routerPath } from '@/shared/config/routeConfig/routeConfig'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack'
import { Comment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'

interface CommentCardProps {
    className?: string
    comment: Comment
    isLoading?: boolean
}

export const CommentCard: FC<CommentCardProps> = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props
    const { t } = useTranslation()

    if (isLoading) {
        return (
            <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border='50%' />
                    <Skeleton height={16} width={100} className={cls.username} />
                </div>
                <Skeleton width='100%' height={50} />
            </VStack>
        )
    }

    return (
        <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={`${routerPath[AppRoutes.PROFILE]}${comment.user?.id}`} className={cls.header}>
                {comment.user?.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
                <Text className={cls.username} title={comment.user?.username} />
            </AppLink>
            <Text text={comment.text} />
        </VStack>
    )
})
