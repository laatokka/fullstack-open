import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(0)

  let buttonName = 'view'

  const toggleVisibility = () => setVisible(!visible)
  const changeVisibility = { display: visible ? '' : 'none' }

  const likeHandler = async () => {
    const update = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogsService.update(blog.id, update)
    setLikes(blog.likes++)
  }

  const removeHandler = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        await blogsService.remove(blog.id)
      } catch (error) {
        console.log('Authorization failed')
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let remove = blog.user.username === user.username
  if (remove) {
    remove = <button onClick={removeHandler}>remove</button>
  }

  visible
    ? buttonName = 'hide'
    : buttonName = 'view'

  return (
    <div className="blog" style={blogStyle}>
      {blog.title}
      {blog.author}
      <button onClick={toggleVisibility}>{buttonName}</button>
      <br />

      <div style={changeVisibility} className="additionalInfo">
        {blog.url} <br />
        {blog.likes} <button onClick={likeHandler}>like</button> <br />
        {blog.user.name} <br />
        {remove}
      </div>
    </div>
  )
}

export default Blog
