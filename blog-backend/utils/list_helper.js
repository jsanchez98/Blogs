const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const maxNumber = Math.max(...blogs.map((blog) => blog.likes))
    return blogs.find((blog) => blog.likes === maxNumber)
}

const mostBlogs = (blogs) => {
    const authors = blogs.map((blog) => blog.author)
    const authorList = [...new Set(authors)]
    const tallies = authorList.map((author) => parseInt(authors.reduce((total, occurrence) => total + (occurrence === author), 0)))

    return {
        author: authorList[tallies.indexOf(Math.max(...tallies))],
        blogs: Math.max(...tallies)
    }
}

const mostLikes = (blogs) => {
    return {
        author: blogs[blogs.map(blog => blog.likes).indexOf(Math.max(...blogs.map(blog => blog.likes)))].author,
        likes: Math.max(...blogs.map(blog => blog.likes))
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}