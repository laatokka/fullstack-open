const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {

  const blogs = await Blog
    .find({})
    .populate('user', { username: 'nakki', name: 'Nachokki', id: 100 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {

  if (!req.body.likes) {
    req.body.likes = 0
  }

  const { title, author, url, likes } = req.body

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  })

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id || token) {
      return res.status(401).json({ error: 'token invalid or missing' })
    }

    const user = await User.findById(decodedToken.id)
    blog.user = user._id

    if (title && url) {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      res.status(201).json(savedBlog)
    } else {
      res.status(400).send()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id || token) {
      return res.status(401).json({ error: 'token invalid or missing' })
    }

    const blog = await Blog.findById(req.params.id)
    if (blog.user.toString() === user._id.toString()) {
      await Blog.deleteOne(blog)
      res.status(204).end()
    }

    else {
      res.status(401).json({ error: 'unauthorized operation' })
    }

  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {

  const { title, author, url, likes } = req.body
  const blog = {
    title,
    author,
    url,
    likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
