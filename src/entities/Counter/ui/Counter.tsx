import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue'
import { useCounterActions } from '../model/slice/counterSlice'

export const Counter = () => {
    // const dispatch = useDispatch()
    // const counterValue = useSelector(getCounterValue)
    const counterValue = useCounterValue()
    const { add, decrement, increment } = useCounterActions()
    const { t } = useTranslation()

    const handleIncrement = () => {
        // dispatch(counterActions.increment())
        increment()
    }

    const handleDecrement = () => {
        // dispatch(counterActions.decrement())
        decrement()
    }

    const handleAddFive = () => {
        // dispatch(counterActions.decrement())
        add(5)
    }

    return (
        <div>
            <h1 data-testid='value-title'>{counterValue}</h1>
            <Button data-testid='increment-five-btn' onClick={handleAddFive}>
                {t('add5')}
            </Button>
            <Button data-testid='increment-btn' onClick={handleIncrement}>
                {t('increment')}
            </Button>
            <Button data-testid='decrement-btn' onClick={handleDecrement}>
                {t('decrement')}
            </Button>
        </div>
    )
}
