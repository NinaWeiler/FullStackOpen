const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('../utils/middleware')



usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (body.password.length < 3) {
        return response.status(400).send({ error: 'Password must be atleast 3 characters long' })
    }
    try {

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        })


        const savedUser = await user.save()

    response.json(savedUser)
    } catch (err) {
        next(err)
  }
})

module.exports = usersRouter