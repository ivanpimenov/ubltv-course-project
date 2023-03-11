import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'

import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError'
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData'

import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'

import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { className } = props
    const { t } = useTranslation('profile')

    const data = useSelector(getProfileData)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('profile')} />
                <Button className={cls.editBtn} variant={ButtonVariant.OUTLINE}>{t('edit')}</Button>
            </div>
            <div className={cls.data}>
                <Input className={cls.input} value={data?.first} placeholder={t('name')} />
                <Input className={cls.input} value={data?.lastname} placeholder={t('surname')} />
            </div>
        </div>
    )
}
