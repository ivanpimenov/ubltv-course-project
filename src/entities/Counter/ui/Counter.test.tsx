import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from 'shared/lib/tests/componentRender/componentRender'
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation'
import { Counter } from './Counter'

describe('Counter', () => {
    beforeEach(() => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        })
    })
    test('render', () => {
        expect(screen.getByTestId('value-title')).toHaveTextContent('10')
    })

    test('incremet', () => {
        fireEvent.click(screen.getByTestId('increment-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('11')
    })

    test('decrement', () => {
        fireEvent.click(screen.getByTestId('decrement-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('9')
    })
})
