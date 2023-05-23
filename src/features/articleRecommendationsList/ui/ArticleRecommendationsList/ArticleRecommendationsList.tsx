import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ArticleList } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text'

import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi'

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props
        const { t } = useTranslation()
        const {
            isLoading,
            data: articles,
            error,
        } = useArticleRecommendationsList(3)

        if (isLoading || error || !articles) return null

        return (
            <VStack
                data-testid='ArticleRecommendationsList'
                gap='8'
                className={classNames('', {}, [className])}
            >
                <Text size={TextSize.L} title={t('recommend')} />
                <ArticleList
                    // virtualized={false}
                    articles={articles}
                    target='_blank'
                />
            </VStack>
        )
    }
)
