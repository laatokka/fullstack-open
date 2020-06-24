import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title, author, url
    })
  }
  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            value={author}
            name='Author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            type="text"
            value={url}
            name='Url'
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" id="create">create</button>
      </form>
    </div>
  )
}


export default NewBlogForm