import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ArticleDetails } from '@/entities/Article'
import { ArticleRating } from '@/features/articleRating'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page/Page'
import { articleDetailsPageReducer } from '../../model/slices'
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

    // if (!id) return <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>{t('article not found')}</Page>

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailPage, {}, [className])}>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRating articleId={id!} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id!} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPage)
