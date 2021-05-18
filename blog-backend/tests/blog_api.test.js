const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blogapi_test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const loginToken = await helper.getLoginToken()

    for(const blog of helper.initialBlogs){
        let blogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${loginToken}`)
            .send(blogObject)
            .expect(200)
    }
})

test('a specific blog is within the returned list', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContainEqual('React patterns')
})

test('blog list has the right number of blog posts', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body

    expect(contents).toHaveLength(helper.initialBlogs.length)
})

test('verify id', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body

    contents.forEach((blog) => {
        expect(blog.id).toBeDefined()
    })
})

test('a valid blog can be added', async () => {
    const loginToken = await helper.getLoginToken()

    const newBlog = {
        title: 'test blog',
        author: "jsanch",
        url: 'jsanch.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loginToken}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.blogsInDb()
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = notesAtEnd.map(note => note.title)
    expect(contents).toContain('test blog')
})

test('if title and url are missing, backend responds with status code 400', async () => {
    const incompleteBlog = {
        author: 'jsanchez',
        likes: 3
    }

    const loginToken = await helper.getLoginToken()

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loginToken}`)
        .send(incompleteBlog)
        .expect(400)
})

test('if likes is missing, value will default to 0', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBe(0)
})

test('can delete a single blog post resource by id', async () => {
    const response = await api.get('/api/blogs')
    const blogsBeforeDeletion = response.body
    const blogToBeDeleted = blogsBeforeDeletion[0]

    const loginToken = await helper.getLoginToken()

    await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .set('Authorization', `bearer ${loginToken}`)
        .expect(204)

    const afterResponse = await api.get('/api/blogs')
    const blogsAfterDeletion = afterResponse.body

    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)

    const titles = blogsAfterDeletion.map(blog => blog.title)
    expect(titles).not.toContain(blogToBeDeleted.title)
})

test('can update number of likes on a post', async () => {
    const response = await api.get('/api/blogs')
    const blogToBeUpdated = response.body[0]


    const alteredBlog = {...blogToBeUpdated}
    alteredBlog.likes += 1

    const putResponse = await api
        .put(`/api/blogs/${alteredBlog.id}`)
        .send(alteredBlog)
        .expect(200)

    const updatedBlog = putResponse.body

    expect(updatedBlog.likes).toBe(blogToBeUpdated.likes + 1)
})

afterAll((done) => {
    mongoose.connection.close()
    done()
})
