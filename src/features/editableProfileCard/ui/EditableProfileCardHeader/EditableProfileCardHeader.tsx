import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { getUserAuthData } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text } from '@/shared/ui/Text/Text'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/service/updateProfileData/updateProfileData'

interface EditableProfileCardHeaderProps {
    className?: string
}

export const EditableProfileCardHeader: FC<EditableProfileCardHeaderProps> = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props

        const { t } = useTranslation('profile')
        const authData = useSelector(getUserAuthData)
        const profileData = useSelector(getProfileData)
        const canEdit = authData?.id === profileData?.id
        const dispatch = useAppDispatch()
        const readonly = useSelector(getProfileReadonly)

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadOnly(false))
        }, [dispatch])

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit())
        }, [dispatch])

        const onSave = useCallback(() => {
            dispatch(updateProfileData())
        }, [dispatch])

        return (
            <HStack max justify='between' className={classNames('', {}, [className])}>
                <Text title={t('profile')} />
                {canEdit && (
                    <div>
                        {readonly ? (
                            <Button
                                variant={ButtonVariant.OUTLINE}
                                onClick={onEdit}
                                data-testid='EditableProfileCardHeader.EditButton'
                            >
                                {t('edit')}
                            </Button>
                        ) : (
                            <HStack gap='8'>
                                <Button
                                    variant={ButtonVariant.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                    data-testid='EditableProfileCardHeader.CancelButton'
                                >
                                    {t('cancel')}
                                </Button>
                                <Button
                                    variant={ButtonVariant.OUTLINE}
                                    onClick={onSave}
                                    data-testid='EditableProfileCardHeader.SaveButton'
                                >
                                    {t('save')}
                                </Button>
                            </HStack>
                        )}
                    </div>
                )}
            </HStack>
        )
    }
)
