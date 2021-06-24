import React, {useState} from 'react'
import blogService from '../services/blogs'
import { addLike } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import { removeBlog } from "../reducers/blogReducer"
import { notificationChange } from "../reducers/notificationReducer"
import { Link } from 'react-router-dom'
import { Delete} from '@material-ui/icons'
import {IconButton} from "@material-ui/core"

export const Comments = ({comments}) => {
  if(!comments){
    return(
        <>
        </>
    )
  }

  return(
      <>
        <ul>
          {comments.map(comment =>
                  <li key={Math.random()*100}>{comment}</li>
                )}
        </ul>
      </>
  )
}

const Blog = ({ blog }) => {
  const [isView, setIsView] = useState(false)
  const [viewOrHide, setViewOrHide] = useState(true)
  const view = {display: isView ? '' : 'none'}
  const buttonText = (viewOrHide) ? 'view' : 'hide'
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewButtonHandler = () => {
    setIsView(!isView)
    setViewOrHide(!viewOrHide)
  }

  const likeHandler = async (event) => {
    event.preventDefault()
    await dispatch(addLike(blog.id, blog))
  }

  const removeHandler = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`Delete ${blog.title}`)) {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog))
        dispatch(notificationChange(`${blog.title} deleted`, 5))
      }
    }catch(exception){
      console.log(exception)
      dispatch(notificationChange('Remove denied', 5))
    }
  }

  return(
    <div style={blogStyle} className='fixed'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
      <button onClick={viewButtonHandler}>{buttonText}</button>
      <div style={view} className='semi-toggleable'>
        <p>{blog.url}</p>
        <p className='likes'>likes {blog.likes} <button onClick={likeHandler} className='likeButton'>like</button></p>
        <p>{blog.user.name}</p>
        <IconButton onClick={removeHandler}><Delete/></IconButton><br>
      </br>
        comments:
        <Comments comments={blog.comments}/>
      </div>
    </div>
  )
}

export default Blog
