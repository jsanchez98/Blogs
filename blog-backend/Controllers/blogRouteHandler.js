const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    await response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }

    console.log(decodedToken.id)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
            title: body.title,
            author: body.author,
            user: user._id,
            url: body.url,
            likes: body.likes,
            comments: body.comments
    })

    const savedBlog = await blog.save()
    console.log('REACHED')
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()
    await response.json(savedBlog)
})

blogRouter.post('/:id', async (request, response) => {
    const body = request.body

    const blogToBeUpdated = await Blog.findById(request.params.id)
    blogToBeUpdated.comments.push(body.comments)
    console.log('BLOGTOBEUPDATED', blogToBeUpdated)
    await blogToBeUpdated.save()
    await response.status(200).json(blogToBeUpdated)
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    await response.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    console.log(decodedToken)
    if(!request.token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    if(blog.user.toString() === user._id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }else{
        return response.status(401).json({error: 'access denied'})
    }
})

module.exports = blogRouter