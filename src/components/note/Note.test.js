import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const component = render(<Note note={note}></Note>)

    // component.getByText('This is a test')
    // component.getByText('make not important')

    expect(component.container).toHaveTextContent('This is a test')
    expect(component.container).toHaveTextContent('make not important')
})

test('button click fires event', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const mockHandler = jest.fn()
    const component = render(<Note note={note} toggleImportance={mockHandler}></Note>)

    const button = component.getByText('make not important')
    fireEvent.click(button)
    
    expect(mockHandler).toHaveBeenCalledTimes(1);
})