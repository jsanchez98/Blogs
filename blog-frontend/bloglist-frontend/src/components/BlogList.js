import Blog from "./Blog";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {initialiseBlogs} from "../reducers/blogReducer"
import  {Typography, List, ListItem, ListItemText, Paper}  from '@material-ui/core'

const BlogList = ({ logout, setMessage}) => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initialiseBlogs())
    }, [dispatch])

    if(!blogs){
        return(
            <div>
            </div>
        )
    }
    return (
        <div>
            <Typography variant='subtitle1' align='center' gutterBottom>blogs</Typography>
            <p>{user.name} logged in {logout()}</p>
            <Paper>
                <List>
                    {blogs.map(blog =>
                        <ListItem>
                            <Blog key={blog.id} blog={blog}
                                  setMessage={setMessage}
                            />
                        </ListItem>
                    )}
                </List>
            </Paper>
        </div>
    )
}

export default BlogList