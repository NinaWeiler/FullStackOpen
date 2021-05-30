/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const api = supertest(app)



let userToken
let otherUserToken

beforeAll(async () => {
    await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  //create root user
  const userHash = await bcrypt.hash('admin', 10)
  const user = await new User({ username: 'root', passwordHash: userHash }).save()
  userToken = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)

  //create other user
  const otherHash = await bcrypt.hash('topsecret', 10)
  const otherUser = await new User({ username: 'other', passwordHash: otherHash }).save()
  otherUserToken = jwt.sign({ username: otherUser.username, id: otherUser._id }, process.env.SECRET)

  //save root user as the owner of initial blogs
  for (let blog of helper.initialBlogs) {
    blog.user = user._id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


describe('when initially some blogs saved', () => {


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog title is returned', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)
    expect(titles).toContain('React patterns')
  })
  test('identifier is named "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

// implement token into tests to make them work
describe('adding a new blog', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      author: 'Danny Jay',
      title: 'The art of thinking',
      url: 'www.google.com',
      likes: '1'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userToken}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // check data stored in database after saving
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(newBlog.title)
  })

  test('blog without title is not added. backend responds with 400', async () => {
    const newBlog = {
      author: 'Danjel',
      url: 'www.google.com',
      likes: 3
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userToken}`)
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not added. backend responds with 400', async () => {
    const newBlog = {
      author: 'Danjel',
      title: 'Beer',
      likes: 3
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userToken}`)
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without likes defaults to 0', async () => {
    const newBlog = {
      author: 'Danjel',
      title: 'Plants',
      url: 'www.google.com'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userToken}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect((blogsAtEnd[blogsAtEnd.length - 1]).likes).toBe(0)
  })
  test('fails with statuscode 401 with invalid or expired token', async () => {
    const newBlog = {
      author: 'Danjel',
      title: 'Beer',
      likes: 3
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer notoken34343')
      .send(newBlog)
      .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('fails with statuscode 401 when token missing', async () => {
    const newBlog = {
      author: 'Danjel',
      title: 'Beer',
      likes: 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

// editing, auth, no auth, wrong auth
describe('editing a blog', () => {
  test('succeeds when edited by user who added the blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: 30
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `bearer ${userToken}`)
    .send(updatedBlog)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes)
  })
  test('fails when edited by user who did not add the blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: 30
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `bearer ${otherUserToken}`)
    .send(updatedBlog)
    .expect(403)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes)
  })
  test('fails when no token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: 30
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes)
  })
  test('fails trying to edit if invalid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const updatedBlog = {
      likes: 30
    }

    await api
    .put('/api/blogs/28882737')
    .set('Authorization', `bearer ${userToken}`)
    .send(updatedBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes)

  })
  test('fails when removing author which is required', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      author: ''
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `bearer ${userToken}`)
    .send(updatedBlog)
    .expect(403)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes)
  })
})

describe('deletion of blog', () => {
  test('fails with status code 401 if token is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(blogToDelete.title)
  })
  test('fails with status code 403 if wrong user tries to delete', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${otherUserToken}`)
    .expect(403)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(blogToDelete.title)
  })
  test('fails with status code 400 if authorized but wrong id', async () => {

    await api
    .delete('/api/blogs/28882737')
    .set('Authorization', `bearer ${userToken}`)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })
  test('succeeds with status code 204 if authorized', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${userToken}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
})