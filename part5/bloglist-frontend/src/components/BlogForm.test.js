import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Stoaway' },
  })
  fireEvent.change(author, {
    target: { value: 'Jack Porter' },
  })
  fireEvent.change(url, {
    target: { value: 'stoaway.org' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Stoaway')
  expect(createBlog.mock.calls[0][0].author).toBe('Jack Porter')
  expect(createBlog.mock.calls[0][0].url).toBe('stoaway.org')
})
