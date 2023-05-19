import { FC, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Drawer } from '@/shared/ui/Drawer'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating'
import { Text } from '@/shared/ui/Text'

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
    rate?: number
}

export const RatingCard: FC<RatingCardProps> = memo((props: RatingCardProps) => {
    const { className, onAccept, feedbackTitle, hasFeedback, onCancel, title, rate = 0 } = props
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starsCount, setStarsCount] = useState(rate)
    const [feedback, setFeedback] = useState('')
    const isMobile = useDevice()

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount)
            if (hasFeedback) setIsModalOpen(true)
            else onAccept?.(selectedStarsCount)
        },
        [hasFeedback, onAccept]
    )

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false)
        onAccept?.(starsCount, feedback)
    }, [feedback, onAccept, starsCount])

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false)
        onCancel?.(starsCount)
    }, [onCancel, starsCount])

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                data-testid='RatingCard.Input'
                fullwidth
                placeholder={t('your feedback')}
                value={feedback}
                onChange={setFeedback}
            />
        </>
    )

    return (
        <Card data-testid='RatingCard' fullwidth className={className}>
            <VStack align='center' gap='8'>
                <Text title={starsCount ? t('thnx for rate') : title} />
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
                {!isMobile ? (
                    <Modal isOpen={isModalOpen} lazy>
                        <VStack max gap='32'>
                            {modalContent}
                            <HStack max gap='16' justify='end'>
                                <Button
                                    data-testid='RatingCard.Close'
                                    onClick={cancelHandle}
                                    variant={ButtonVariant.OUTLINE_RED}
                                >
                                    {t('close')}
                                </Button>
                                <Button data-testid='RatingCard.Send' onClick={acceptHandle}>
                                    {t('send')}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
                ) : (
                    <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                        <VStack gap='32'>
                            {modalContent}
                            <Button fullWidth onClick={acceptHandle} size={ButtonSize.L}>
                                {t('send')}
                            </Button>
                        </VStack>
                    </Drawer>
                )}
            </VStack>
        </Card>
    )
})
