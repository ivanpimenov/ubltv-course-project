import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { EditableProfileCard } from '@/features/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
import { Page } from '@/widgets/Page'

interface ProfilePageProps {
    className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const { t } = useTranslation('profile')
    const { id } = useParams<{ id: string }>()

    if (!id) return <Text text={t('profile not found')} />

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack max gap='16'>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    )
}

export default ProfilePage
