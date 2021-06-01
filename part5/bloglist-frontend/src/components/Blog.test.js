import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  const mockHandlerLike = jest.fn()

  beforeEach(() => {

    const blog = {
      title: 'Plants basics',
      author: 'Nolan Ross',
      url: 'nolanross.com',
      likes: 15,
      user: { username: 'Emily' },
    }

    component = render(<Blog blog={blog} toggleVisibility={mockHandler} updateBlog={mockHandlerLike} />)
  })

  test('renders title and author but not url or likes by default', () => {

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('Plants basics')
    expect(div).not.toHaveTextContent('nolanross.com')
    expect(div).not.toHaveTextContent('15')
  })

  test('url and likes are shown when show button has been clicked', () => {

    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('Plants basics')
    expect(div).toHaveTextContent('nolanross.com')
    expect(div).toHaveTextContent('15')
  })

  test('if like button clicked twice, event handler called twice', () => {

    const button = component.getByText('show')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})
