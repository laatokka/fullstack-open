const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const _ = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const testUtil = require('./testUtil')

const api = supertest(app)

// npm test -- -t 'test name here'

describe('GET blogs: ', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('identifier property is id instead of _id', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
    expect(blogs.body[0].id).toBeDefined()
  })
})


describe('POST blog requests', () => {
  test('POSTing a blog increases the blog count', async () => {
    const blog = {
      title: "You can make it!",
      author: "Deterministico Beautiferonzo",
      url: "www.workhardandwin.com",
      likes: "56"
    }

    const blogs = await api
      .get('/api/blogs')
    const num = blogs.body.length

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)

    const check = await api.get('/api/blogs')
    expect(check.body.length).toBe(num + 1)
  })

  test('"likes" property defaults to 0, if missing', async () => {
    const blog = {
      title: "This blog has zero likes!",
      author: "Mr. Zero",
      url: "www.zeroes.forkz",
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)

    const check = await api.get('/api/blogs')
    const lastBlog = _.last(check.body)

    expect(lastBlog.likes).toBe(0)
  })

  test('If title and url properties are missing, server responds with 400', async () => {
    const blog = {
      author: "Mr. Zero"
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  })
})

describe('POST user requests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('salaisuus', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Posting a new user is successful', async () => {
    const usersBefore = await testUtil.usersInDb()

    const newUser = {
      username: 'Initial Haarukka',
      password: 'metodisalem',
      name: 'Heikki Hyyttö',
      userId: '5ee07a324a8649cb010703f8'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await testUtil.usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length + 1)

    const users = usersAfter.map(user => user.username)
    expect(users).toContain(newUser.username)
  })

  test('Invalid user is not added to database', async () => {
    const newUser = {
      username: "bad user",
      password: '12',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect('Both username and password must be at least of length 3')
      .expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close()
})