import { Currency, CurrencySelect } from 'entities/Currency'
import { Country, CountrySelect } from 'entities/Country'
import { useTranslation } from 'react-i18next'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'

import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { Text, TextAlign, TextVariant } from 'shared/ui/Text/Text'

import { Profile } from '../../model/types/profile'
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string
    data?: Profile | null
    error?: string | null
    isLoading?: boolean
    readonly?: boolean
    onChangeFirstname?: (value?: string) => void
    onChangeLastname?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeUserName?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUserName,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props
    const { t } = useTranslation('profile')

    if (isLoading)
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        )

    if (error)
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    variant={TextVariant.ERROR}
                    align={TextAlign.CENTER}
                    title={t('user loading error')}
                    text={t('try to reload the page')}
                />
            </div>
        )

    const mods: Mods = {
        [cls.editing]: !readonly,
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar src={data?.avatar} alt='' />
                    </div>
                )}
                <Input
                    className={cls.input}
                    value={data?.first}
                    placeholder={t('name')}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    value={data?.lastname}
                    placeholder={t('surname')}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    value={data?.age}
                    placeholder={t('age')}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    value={data?.city}
                    placeholder={t('city')}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    value={data?.username}
                    placeholder={t('username')}
                    onChange={onChangeUserName}
                    readonly={readonly}
                />
                <Input
                    className={cls.input}
                    value={data?.avatar}
                    placeholder={t('avatar')}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    )
}
