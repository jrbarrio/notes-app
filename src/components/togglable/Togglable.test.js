import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable>', () => {
    const buttonLabel = 'Show'
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel={buttonLabel}>
                <div className='testDiv'>testDivContent</div>
            </Togglable>
        )
    })

    test('renders its children', () => {
        const element = component.getByText("testDivContent")
        expect(element.parentNode).toHaveStyle('display: none')
    })

    test('must show after button click', () => {
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)
        const element = component.getByText("testDivContent")
        expect(element.parentNode).not.toHaveStyle('display: none')
    })
})