import { FC, HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
// import { List, ListRowProps, WindowScroller } from 'react-virtualized'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { ArticleView } from '../../model/consts/articleConsts'
import { Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
    // virtualized?: boolean
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />)

export const ArticleList: FC<ArticleListProps> = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
        // virtualized = true
    } = props
    const { t } = useTranslation()

    if (!isLoading && !articles.length)
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t('articles not found')} />
            </div>
        )

    const renderArticle = (article: Article) => (
        <ArticleListItem article={article} view={view} target={target} className={cls.card} key={article.id} />
    )

    // const isBig = view === ArticleView.BIG

    // const itemsPerRow = isBig ? 1 : 3
    // const windowW = document?.getElementById(PAGE_ID)?.offsetWidth
    // const itemsPerRow = isBig ? 1 : Math.ceil(windowW! / 360)
    // const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)

    // const rowRenderer = ({ index, isScrolling, key, style }: ListRowProps) => {
    //     const items = []
    //     const fromIndex = index * itemsPerRow
    //     const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

    //     for (let i = fromIndex; i < toIndex; i += 1) {
    //         items.push(
    //             <ArticleListItem
    //                 target={target}
    //                 article={articles[i]}
    //                 view={view}
    //                 className={cls.card}
    //                 key={articles[i].id}
    //             />
    //         )
    //     }

    //     return (
    //         <div key={key} style={style} className={cls.row}>
    //             {items}
    //         </div>
    //     )
    // }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>

    // @ts-ignores
    // <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
    //     {({
    //         height,
    //         width,
    //         registerChild,
    //         onChildScroll,
    //         isScrolling,
    //         scrollTop,
    //         //
    //     }) => (
    //         // @ts-ignores
    //         <div ref={registerChild} className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
    //             {virtualized ? (
    //                 // @ts-ignores
    //                 <List
    //                     height={height ?? 700}
    //                     rowCount={rowCount}
    //                     rowHeight={isBig ? 700 : 330}
    //                     rowRenderer={rowRenderer}
    //                     width={width ? width - 80 : 700}
    //                     autoHeight
    //                     onScroll={onChildScroll}
    //                     isScrolling={isScrolling}
    //                     scrollTop={scrollTop}
    //                     // autoWidth
    //                     // autoContainerWidth
    //                 />
    //             ) : (
    //                 articles.map(item => (
    //                     <ArticleListItem
    //                         article={item}
    //                         view={view}
    //                         target={target}
    //                         key={item.id}
    //                         className={cls.card}
    //                     />
    //                 ))
    //             )}

    //             {isLoading && getSkeletons(view)}
    //         </div>
    //     )}
    // </WindowScroller>
    )
})
