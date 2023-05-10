import { FC, memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextAlign } from '@/shared/ui/Text'

import cls from './ArticleImageBlockComponent.module.scss'

import { ArticleImageBlock } from '../../model/types/article'

interface ArticleImageBlockComponentProps {
    className?: string
    block: ArticleImageBlock
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props

        return (
            <div className={classNames(cls.articleImageBlockComponent, {}, [className])}>
                <img src={block.src} alt={block?.title} className={cls.img} />
                {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
            </div>
        )
    }
)
