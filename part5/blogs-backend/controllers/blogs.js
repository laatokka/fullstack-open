const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

router.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'only the creator can delete blogs' })
  }

  await blog.remove()
  user.blogs = user.blogs.filter(b => b.id.toString() !== req.params.id.toString())
  await user.save()
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const blog = req.body
  blog.likes++
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

router.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return res.status(400).send({ error: 'title or url missing ' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

module.exports = router