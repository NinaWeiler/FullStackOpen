const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// /api/blogs

// async/await
/* response.json(blogs.map(blog => blog.toJSON)) */

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
	const body = request.body
	//const user = await User.findbyId(body.userId)
	const user = await User.findById('60af801129332a3b3cd45fea')
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	//saving info about blog to user db
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogRouter.delete('/:id', async (request,response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0,
	}

	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	.then(updatedBlog => {
		response.json(updatedBlog.toJSON())
	})
	.catch(error => next(error))

	}
)

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