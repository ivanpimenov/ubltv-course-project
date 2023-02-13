import { render, screen } from '@testing-library/react'
import { Button, ButtonVariant } from './Button'

describe('Button', () => {
    test('Button render', () => {
        render(<Button>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    test('Button render with variant', () => {
        render(<Button variant={ButtonVariant.CLEAR}>Test</Button>)
        expect(screen.getByText('Test')).toHaveClass('clear')
        screen.debug()
    })
})
