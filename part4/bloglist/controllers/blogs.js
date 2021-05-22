const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// /api/blogs

blogRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})
  
module.exports = blogRouter