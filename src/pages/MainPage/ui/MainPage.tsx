import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Counter } from '@/entities/Counter'
import { Page } from '@/widgets/Page'

const MainPage = () => {
    const { t } = useTranslation('main')
    const [value, setValue] = useState('')

    const onChange = (val: string) => {
        setValue(val)
    }
    return (
        <Page data-testid='MainPage'>
            <div>12312325435423</div>
            <Counter />
            {/* <BugButton /> */}
            {t('Главная страница')}
        </Page>
    )
}

export default MainPage
