import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailPage.module.scss'

interface ArticleDetailPageProps {
    className?: string
}

const ArticleDetailPage: FC<ArticleDetailPageProps> = props => {
    const { className } = props
    const { t } = useTranslation('article')

    return <div className={classNames(cls.articleDetailPage, {}, [className])}>Article detail page</div>
}

export default memo(ArticleDetailPage)
