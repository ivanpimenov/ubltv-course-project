import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import { Comment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

interface CommentListProps {
    className?: string
    comments?: Comment[]
    isLoading?: boolean
}

const loadingComments: Comment[] = [
    {
        id: '1',
        text: 'loading cooment',
        user: { id: '1', username: 'loading' },
    },
    {
        id: '2',
        text: 'loading cooment',
        user: { id: '1', username: 'loading' },
    },
]

export const CommentList: FC<CommentListProps> = memo(
    (props: CommentListProps) => {
        const { className, comments, isLoading } = props
        const { t } = useTranslation()

        if (isLoading && !comments?.length)
            return (
                <VStack
                    gap='16'
                    max
                    className={classNames('', {}, [className])}
                >
                    {loadingComments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            isLoading={isLoading}
                            comment={comment}
                        />
                    ))}
                </VStack>
            )

        return (
            <VStack gap='16' max className={classNames('', {}, [className])}>
                {comments?.length ? (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            isLoading={isLoading}
                            comment={comment}
                        />
                    ))
                ) : (
                    <Text text={t('no comments')} />
                )}
            </VStack>
        )
    }
)
