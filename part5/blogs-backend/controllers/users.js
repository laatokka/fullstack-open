const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1, likes: 1, author: 1 })

  res.json(users.map(u => u.toJSON()))
})

router.post('/', async (req, res) => {
  const { password, name, username } = req.body

  if (!password || password.length < 3) {
    return res.status(400).send({
      error: 'password must min length 3'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = router