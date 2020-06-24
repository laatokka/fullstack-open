import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/react'

// CI=true npm test

test('view shows additional data AND changes to hide', async () => {
  const blog = {
    title: 'Tuomaksen merimatkat',
    author: 'Tuomas Tullimies',
    likes: 17,
    url: 'tuomastullaatukintullerot.fi',
    user: { username: 'Tuomas' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      toggleVisibility={mockHandler}
    />
  )

  expect(component.container).toHaveTextContent('view')
  expect(component.container).not.toHaveTextContent('hide')

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent('hide')

})

test('clicking a button shows additional information', () => {
  const blog = {
    title: 'Tuomaksen merimatkat',
    author: 'Tuomas Tullimies',
    likes: 17,
    url: 'tuomastullaatukintullerot.fi',
    user: { username: 'Tuomas' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      toggleVisibility={mockHandler}
    />
  )

  const div = component.container.querySelector('.additionalInfo')
  expect(div).toHaveStyle('display: none;')

})

test('pressing like button two times calls event handler two times', async () => {
  const blog = {
    title: 'Tuomaksen merimatkat',
    author: 'Tuomas Tullimies',
    url: 'tuomastullaatukintullerot.fi',
    likes: 17,
    user: { username: 'Tuomas' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      onClick={mockHandler} />
  )

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})


test('renders title', () => {
  const blog = {
    title: 'Tuomaksen merimatkat',
    author: 'Tuomas Tullimies',
    likes: 17,
    url: 'tuomastullaatukintullerot.fi',
    user: { username: 'Tuomas' }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Tuomaksen merimatkat'
  )

  // const element = component.getByText(
  //   'Tuomaksen merimatkat'
  // )
  // expect(element).toBeDefined()

  const div = component.container.querySelector('.blog')

  // console.log(prettyDOM(div))

  expect(div).toHaveTextContent(
    'Tuomas Tullimies'
  )
})