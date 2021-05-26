const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// /api/blogs

// async/await
/* response.json(blogs.map(blog => blog.toJSON)) */

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
	const body = request.body
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})

	try {
		const savedBlog = await blog.save()
		response.json(savedBlog.toJSON())
	} catch(error) {
		console.log(error)
	}
})

/*
// using promises
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

*/

module.exports = blogRouter