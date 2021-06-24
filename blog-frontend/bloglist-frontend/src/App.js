import React, {useEffect, useRef, useState} from 'react'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Toggleable from './components/Toggleable'
import './index.css'
import {useSelector, useDispatch} from "react-redux"
import {setUser} from "./reducers/userReducer"
import { BrowserRouter as Router, Switch, Route, useRouteMatch} from 'react-router-dom'
import Users from "./components/Users"
import Menu from './components/Menu'
import User from './components/User'
import userService from "./services/users"
import BlogView from './components/BlogView'
import styles from './App.module.css'

const Notification = ({message}) => {
    if(message === null){
        return null
    }

    return(
        <div className = "error">
            {message}
        </div>
    )
}

const App = () => {
    const [users, setUsers] = useState([])
    const message = useSelector(state => state.notification)
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const userMatch = useRouteMatch('/users/:id')
    const linkedUser = userMatch
        ? users.find(user => user.id === userMatch.params.id)
        : null
    const blogMatch = useRouteMatch('/blogs/:id')
    const linkedBlog = blogMatch
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null
    console.log('BLOG MATCH', blogMatch)
    console.log('BLOGS', blogs)
    console.log('USER', user)
    console.log('LINKED BLOG', linkedBlog)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
        console.log(blogs)
    }, [dispatch])

    useEffect(() => {
        let mounted = true
        const getUsers = async () => {
            const users = await userService.getAll()
            if(mounted) {
                setUsers(users)
            }
        }
        getUsers().then()

        return () => mounted = false
    }, [])

    const logout = () => (
        <button onClick = {(event) => {
            event.preventDefault()
            window.localStorage.removeItem('loggedBlogAppUser')
            dispatch(setUser(null))
            blogService.clearToken()
        }}>
            logout
        </button>
    )

    return (
        <div>
            <Notification message = {message}/>
            <Menu />
            {user === null && <LoginForm
            />}
            <Switch>
                <Route path='/blogs/:id'>
                    <BlogView linkedBlog={linkedBlog}/>
                </Route>
                <Route path='/blogs'>
                    <div>
                        {user !== null && <BlogList logout={logout}
                        />}
                        {user !== null &&
                        <div>
                            <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
                                <NewBlogForm user={user} blogFormRef={blogFormRef}
                                />
                            </Toggleable>
                        </div>
                        }
                    </div>
                </Route>
                <Route path='/users/:id'>
                    <User linkedUser={linkedUser}/>
                </Route>
                <Route path='/users'>
                    {user !== null && <Users users={users} setUsers={setUsers}/>}
                </Route>
                <Route path='/'>
                    <div className={styles.centered}>
                        <h1 style={{textAlign:"center"}}>A Blogging App </h1>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default App