import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ProfileCard } from 'entities/Profile'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text, TextVariant } from 'shared/ui/Text/Text'
import { VStack } from 'shared/ui/Stack'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import { fetchProfileData } from '../../model/service/fetchProfileData/fetchProfileData'
import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'

interface EditableProfileCardProps {
    className?: string
    id: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props
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

    useInitialEffect(() => {
        if (id) dispatch(fetchProfileData(id))
    })

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
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap='8' max className={classNames('', {}, [className])}>
                <EditableProfileCardHeader />
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
            </VStack>
        </DynamicModuleLoader>
    )
})
