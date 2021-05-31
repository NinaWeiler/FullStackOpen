const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// /api/blogs



blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
	if (!request.token) { return response.status(401).json({ error: 'token missing' }) }
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
	if (!request.token) { return response.status(401).json({ error: 'token missing' }) }
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		// blog.user contains an object, so has to be parsed into string first
		if (blog.user.toString() !== user._id.toString()) {
			return response.status(403).json({ error: 'Blog can be deleted only by blog owner' })
		}
		await blog.remove()
		return response.status(204).json({ message: 'blog deleted' })
	}
})

blogRouter.put('/:id', async (request, response) => {
	if (!request.token) { return response.status(401).json({ error: 'token missing' }) }
	const user = request.user
	const body = request.body
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		if (blog.user.toString() !== user._id.toString()) {
			return response.status(403).json({ error: 'Blog can be edited only by blog owner' })
		}
		if(body.author === '' || body.url === '') { return response.status(403).json({ error: 'Author and url are required' })}
		const updatedBlogInfo = {
			title: body.title || blog.title,
			author: body.author || blog.author,
			url: body.url || blog.url,
			likes: body.likes || blog.likes
		}

		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogInfo, { new: true })
		const populatedBlog = await updatedBlog
			.populate('user', { username: 1, name: 1 })
			.execPopulate()

		return response.json(populatedBlog.toJSON())

	}

	}
)



module.exports = blogRouter