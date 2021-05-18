import React, {useState} from 'react'
import {addBlog} from "../reducers/blogReducer"
import {notificationChange} from "../reducers/notificationReducer"
import { useDispatch} from "react-redux";

const NewBlogForm = (props) => {
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const handleBlogSubmit = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        props.blogFormRef.current.toggleVisibility()
        try {
            dispatch(addBlog(blogObject))
        }catch(exception){
            dispatch(notificationChange('blog add failed'))
        }

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    if(props.user === null) {
        return null
    }

    return(
        <>
            <h2>create new blog</h2>
            <form onSubmit = {handleBlogSubmit}>
                <div>
                    title
                    <input
                        id='title'
                        type = 'text'
                        value = {title}
                        name = 'Title'
                        onChange = {({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        id='author'
                        type = 'text'
                        value = {author}
                        name = 'Author'
                        onChange = {({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        id='url'
                        type = 'text'
                        value = {url}
                        name = 'Url'
                        onChange = {({target}) => setUrl(target.value)}
                    />
                </div>
                <button id='createButton' type = 'submit'>create</button>
            </form>
        </>
    )
}

export default NewBlogForm