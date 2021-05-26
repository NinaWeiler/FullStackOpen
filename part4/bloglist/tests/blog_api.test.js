/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

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

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'Danny Jay',
    title: 'The art of thinking',
    url: 'www.google.com',
    likes: '1'
  }

  await api
    .post('/api/blogs')
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
    .send(newBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect((blogsAtEnd[blogsAtEnd.length - 1]).likes).toBe(0)
})


afterAll(() => {
  mongoose.connection.close()
})
