const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = {
  title: "Sitä saa mitä tilaa",
  author: "Mikko Hyppönen",
  url: "www.defaultblog.fi",
  likes: 120
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlog, 
  nonExistingId, 
  blogsInDb,
  usersInDb,
}

