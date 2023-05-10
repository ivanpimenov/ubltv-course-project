import { useTranslation } from 'react-i18next'
import { Currency, CurrencySelect } from '@/entities/Currency'
import { Country, CountrySelect } from '@/entities/Country'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'

import { Input } from '@/shared/ui/Input'
import { Loader } from '@/shared/ui/Loader'
import { Text, TextAlign, TextVariant } from '@/shared/ui/Text'

import { HStack, VStack } from '@/shared/ui/Stack'
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
            <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </HStack>
        )

    if (error)
        return (
            <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    variant={TextVariant.ERROR}
                    align={TextAlign.CENTER}
                    title={t('user loading error')}
                    text={t('try to reload the page')}
                />
            </HStack>
        )

    const mods: Mods = {
        [cls.editing]: !readonly,
    }

    return (
        <VStack gap='8' max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify='center' max className={cls.avatarWrapper}>
                    <Avatar src={data?.avatar} alt='' />
                </HStack>
            )}
            <Input
                className={cls.input}
                value={data?.first}
                placeholder={t('name')}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid='ProfileCard.firstname'
            />
            <Input
                className={cls.input}
                value={data?.lastname}
                placeholder={t('surname')}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid='ProfileCard.lastname'
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
            <CountrySelect className={cls.input} value={data?.country} onChange={onChangeCountry} readonly={readonly} />
        </VStack>
    )
}
