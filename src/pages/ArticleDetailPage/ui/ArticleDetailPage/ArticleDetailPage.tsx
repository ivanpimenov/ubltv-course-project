import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { FC, memo, Suspense, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text } from 'shared/ui/Text/Text'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AddCommentForm } from 'features/addCommentForm'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { AppRoutes, routerPath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'shared/ui/Page/Page'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
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
    const navigate = useNavigate()

    const onBackToList = useCallback(() => {
        navigate(routerPath[AppRoutes.ARTICLES])
    }, [navigate])

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text))
        },
        [dispatch]
    )

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) return <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>{t('article not found')}</Page>

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>
                <Button variant={ButtonVariant.OUTLINE} onClick={onBackToList}>
                    {t('back to list')}
                </Button>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t('comments')} />
                <Suspense fallback=''>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPage)
