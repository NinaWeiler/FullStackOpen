const blogRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')
//const jwt = require('jsonwebtoken')

/*
const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}
// /api/blogs

// async/await
/* response.json(blogs.map(blog => blog.toJSON)) */

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
	const body = request.body
	const user = request.user
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
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	console.log(user.blogs)
	if (blog) {
		// blog.user contains an object, so has to be parsed into string first
		if (blog.user.toString() !== user._id.toString()) {
			return response.status(403).json({ error: 'Blog can be deleted only by blog owner' })
		}
		await blog.remove()
		return response.status(204).json({ message: 'blog deleted' })
	}
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