import blogService from '../services/blogs'
import { notificationChange} from "./notificationReducer"

const blogReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'LIKE':
            const id = action.data.id
            return state.map(blog => blog.id !== id
                                     ? blog
                                     : action.blog
            )
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.blog.id)
        default:
            return state
    }
}

export const initialiseBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (data) => {
    return async dispatch => {
        const returnedBlog = await blogService.create(data)
        dispatch({
            type: 'NEW_BLOG',
            data: returnedBlog
        })
        dispatch(notificationChange(`New blog added: ${returnedBlog.title}`))
    }
}

export const addLike = (id, blog) => {
    return async (dispatch) => {
        const modifiedBlog = {...blog, likes: blog.likes + 1}
        await blogService.update(modifiedBlog)
        dispatch({
            type: 'LIKE',
            data: { id },
            blog: modifiedBlog
        })
    }
}

export const removeBlog = (blog) => {
    return {
        type: 'REMOVE_BLOG',
        blog
    }
}

export default blogReducer