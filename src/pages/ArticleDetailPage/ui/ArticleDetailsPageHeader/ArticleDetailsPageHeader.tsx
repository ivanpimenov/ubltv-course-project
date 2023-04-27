import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppRoutes, routerPath } from '@/shared/config/routeConfig/routeConfig'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'

import { getArticleDetailsData } from '@/entities/Article'
import { HStack } from '@/shared/ui/Stack'
import { getCanEditArticle } from '../../model/selectors/article'

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { className } = props
        const { t } = useTranslation()
        const navigate = useNavigate()
        const article = useSelector(getArticleDetailsData)
        const canEdit = useSelector(getCanEditArticle)

        const onBackToList = useCallback(() => {
            navigate(routerPath[AppRoutes.ARTICLES])
        }, [navigate])

        const onEditArticle = useCallback(() => {
            navigate(`${routerPath[AppRoutes.ARTICLE_DETAILS]}${article?.id}/edit`)
        }, [navigate, article?.id])

        return (
            <HStack max justify='between' className={classNames('', {}, [className])}>
                <Button variant={ButtonVariant.OUTLINE} onClick={onBackToList}>
                    {t('back to list')}
                </Button>
                {canEdit && (
                    <Button variant={ButtonVariant.OUTLINE} onClick={onEditArticle}>
                        {t('edit article')}
                    </Button>
                )}
            </HStack>
        )
    }
)
