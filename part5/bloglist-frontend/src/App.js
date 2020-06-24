import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const notification = (notif) => {
    setErrorMessage(notif)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3500)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (ex) {
      notification('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    notification('Logout successful')
  }

  const addBlog = async (blogObject) => {
    const blogToAdd = await blogService
      .create(blogObject)

    setBlogs(blogs.concat(blogToAdd))
    notification(blogToAdd.title + ' was added.')

  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogData = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} user={user} />
          )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null
        ?
        <Toggleable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Toggleable>
        :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
          <Toggleable buttonLabel="add a new blog">
            <NewBlogForm
              createBlog={addBlog}
            />
          </Toggleable>
          {blogData()}
        </div>
      }
    </div>
  )
}
export default App