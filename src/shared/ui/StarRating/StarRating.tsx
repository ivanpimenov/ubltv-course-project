import { FC, memo, useState } from 'react'

import { Icon } from '../Icon/Icon'
import { classNames } from '@/shared/lib/classNames/classNames'
import StarIcon from '@/shared/assets/icons/star.svg'

import cls from './StarRating.module.scss'

interface StarRatingProps {
    className?: string
    onSelect?: (starCount: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating: FC<StarRatingProps> = memo((props: StarRatingProps) => {
    const { className, size = 30, selectedStars = 0, onSelect } = props
    const [currentStarsCount, setCurrentStarsCount] = useState(0)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (starsCount: number) => () => {
        if (!isSelected) setCurrentStarsCount(starsCount)
    }

    const onLeave = () => {
        if (!isSelected) setCurrentStarsCount(0)
    }

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount)
            setCurrentStarsCount(starsCount)
            setIsSelected(true)
        }
    }

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map(starNumber => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        { [cls.hovered]: currentStarsCount >= starNumber, [cls.selected]: isSelected },
                        [cls.normal]
                    )}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    )
})
