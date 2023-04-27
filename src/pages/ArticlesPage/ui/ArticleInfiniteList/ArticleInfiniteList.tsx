import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ArticleList } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { getArticles } from '../../model/slices/articlesPageSlice'

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = memo((props: ArticleInfiniteListProps) => {
    const { className } = props
    const { t } = useTranslation()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const error = useSelector(getArticlesPageError)

    if (error) return <Text text={t('error while loading articles')} />

    return (
        <div className={classNames('', {}, [className])}>
            <ArticleList className={className} isLoading={isLoading} view={view} articles={articles} />
        </div>
    )
})
