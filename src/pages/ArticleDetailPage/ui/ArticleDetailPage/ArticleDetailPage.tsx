import { ArticleDetails } from 'entities/Article'
import { ArticleRecommendationsList } from 'features/articleRecommendationsList'
import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from 'shared/ui/Stack'
import { Page } from 'widgets/Page/Page'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId'
import { articleDetailsPageReducer } from '../../model/slices'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import cls from './ArticleDetailPage.module.scss'

interface ArticleDetailPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailPage: FC<ArticleDetailPageProps> = props => {
    const { className } = props
    const { t } = useTranslation('article')
    const { id } = useParams<{ id: string }>()

    if (!id) return <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>{t('article not found')}</Page>

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPage)
