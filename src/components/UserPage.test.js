import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Users from './UserPage'

describe('<Users />', () => {
    let component
    let blogContent =
    {
        'title': 'fake article',
        'url': 'with a fake URL',
        'author': 'fakester',
        'likes': 1
    }
    const incrementLikesForBlog = jest.fn()
    const deleteBlog = jest.fn()
    beforeEach(() => {
        component = render(
            <Users
                key={123123}
                blog={blogContent}
                incrementLikesForBlog={incrementLikesForBlog}
                deleteBlog={deleteBlog}
            />
        )
    })

    test('Users Component renders Successfully', () => {
        const titlefield = component.container.querySelector('.blogTitle')
        expect(titlefield).toBeDefined()
        expect(titlefield).toHaveTextContent('fake article')
    })
})