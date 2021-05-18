import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    beforeEach(() => {
        let blog = {
            title: "test blog",
            author: "test author",
            url: "test url",
            user: {name: "josh sanchez"},
            likes: 0
        }
        let blogs=[]
        blogs = blogs.concat(blog)
        const mock1 = jest.fn()
        const mock2 = jest.fn()
        component = render(
                <Blog blog={blog} blogs = {blogs}
                      setBlogs={mock1} setMessage={mock2}
                      />
        )
    })

    test('only renders title and author by default', () => {
        const expandedDiv = component.container.querySelector('.semi-toggleable')
        expect(expandedDiv).toHaveStyle('display: none')

        const div = component.container.querySelector('.fixed')
        expect(div).toHaveTextContent('test blog')
    })

    test('shows url and number of likes when button is clicked', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.semi-toggleable')
        expect(div).toHaveTextContent('josh sanchez')
    })

    test('likes go up twice if button is clicked twice', () => {
        const button = component.container.querySelector('.likeButton')

        fireEvent.click(button)
        fireEvent.click(button)

        const div = component.container.querySelector('.likes')
        expect(div).toHaveTextContent('2')
    })
})