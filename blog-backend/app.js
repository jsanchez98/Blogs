const config = require('./utils/config')
const blogRouter = require('./Controllers/blogRouteHandler')
const userRouter = require('./Controllers/userRoutes')
const loginRouter = require('./Controllers/loginRoutes')
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const cors = require('cors')
const middleware = require('./utils/middleware')
require('dotenv').config();

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testRoutes')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)


module.exports = app