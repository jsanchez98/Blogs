const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')
require('express-async-errors')

userRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    if(body.password.length < 3){
        return response.status(400).json({error: 'password too short'})
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()

    await response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})

    await response.json(users)
})

module.exports = userRouter