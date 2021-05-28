const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'invalid token' })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token invalid or expired' })
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7)
	}
	next()
}

const userExtractor = async (request, response, next) => {
	console.log(request.token)
	if(request.token) {
		// eslint-disable-next-line no-undef
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		request.user = await User.findById(decodedToken.id)
	}
	next()
}

/*
token {
	username: 'Charlieser',
	id: '60b099ca67441c2d6caad429',
	iat: 1622186702,
	exp: 1622190302
  }
*/
module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}