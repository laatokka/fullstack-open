const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 'world.com', title: 'world yeah', author: 'Traveler 69', id: 20 })
  res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body

    if (username.length < 3 || password.length < 3) {
      return res.status(400).send('Both username and password must be at least of length 3')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
      blogs: []
    })

    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter