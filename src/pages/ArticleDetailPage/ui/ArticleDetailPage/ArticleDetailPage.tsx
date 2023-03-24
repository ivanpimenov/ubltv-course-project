import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text } from 'shared/ui/Text/Text'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import cls from './ArticleDetailPage.module.scss'

interface ArticleDetailPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailPage: FC<ArticleDetailPageProps> = props => {
    const { className } = props
    const { t } = useTranslation('article')
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) return <div className={classNames(cls.ArticleDetailPage, {}, [className])}>{t('article not found')}</div>

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t('comments')} />
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPage)
