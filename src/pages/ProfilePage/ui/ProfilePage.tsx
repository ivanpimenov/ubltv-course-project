import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer,
    ValidateProfileError,
} from 'entities/Profile'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text, TextVariant } from 'shared/ui/Text/Text'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'

const reducers: ReducersList = {
    profile: profileReducer,
}

interface ProfilePageProps {
    className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const { t } = useTranslation('profile')
    const dispatch = useAppDispatch()

    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors)

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('server error'),
        [ValidateProfileError.NO_DATA]: t('no data'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('name surname required'),
        [ValidateProfileError.INCORRECT_AGE]: t('incorrect age'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('incorrect country'),
    }

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') dispatch(fetchProfileData())
    }, [dispatch])

    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ first: value || '' }))
        },
        [dispatch]
    )

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || '' }))
        },
        [dispatch]
    )

    const onChangeAge = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ age: Number(value?.replace(/\D/gi, '') || 0) }))
        },
        [dispatch]
    )

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value || '' }))
        },
        [dispatch]
    )

    const onChangeUserName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || '' }))
        },
        [dispatch]
    )

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || '' }))
        },
        [dispatch]
    )

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }))
        },
        [dispatch]
    )

    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }))
        },
        [dispatch]
    )

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader />
                {validateErrors?.length &&
                    validateErrors.map(err => (
                        <Text key={err} variant={TextVariant.ERROR} text={validateErrorTranslates[err]} />
                    ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUserName={onChangeUserName}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </DynamicModuleLoader>
    )
}

export default ProfilePage
