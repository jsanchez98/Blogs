import React, {useState} from "react"
import {addLike} from "../reducers/blogReducer"
import {useDispatch} from "react-redux"
import {Comments} from './Blog'
import blogService from '../services/blogs'

const BlogView = ({linkedBlog}) => {
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState('')
    const [savedLinkedBlog, setSavedLinkedBlog] = useState(linkedBlog)

    const handleCommentChange = event => {
        setNewComment(event.target.value)
    }

    const likeHandler = async (event) => {
        event.preventDefault()
        await dispatch(addLike(savedLinkedBlog.id, savedLinkedBlog))
    }

    const addComment = async (event) => {
        event.preventDefault()
        const returnedBlog = await blogService.addCommentToDB(newComment, savedLinkedBlog.id)
        setSavedLinkedBlog(returnedBlog)
        setNewComment('')
    }

    return(
        <>
            <h1>{savedLinkedBlog.title}</h1>
            <div>
                {savedLinkedBlog.url}<br>
            </br>
                {savedLinkedBlog.likes} likes <button onClick={likeHandler}>like</button><br>
            </br>
                added by {savedLinkedBlog.author}
            </div><br>
            </br>
                comments:
            <form onSubmit={addComment} >
                <input value={newComment} onChange={handleCommentChange}/>
                <button type='submit'>add comment</button>
            </form>
            <Comments comments={savedLinkedBlog.comments}/>
        </>
    )
}

export default BlogView