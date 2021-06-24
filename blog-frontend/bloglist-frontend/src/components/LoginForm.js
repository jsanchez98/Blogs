import React, {useState} from 'react'
import loginService from "../services/login"
import blogService from "../services/blogs"
import {setUser} from "../reducers/userReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {useDispatch} from 'react-redux'
import {useHistory} from "react-router-dom"
import styles from '../App.module.css'

const useField = (id, type, name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        id,
        type,
        name,
        value,
        onChange,
        setValue
    }
}

const LoginForm = () => {
    const {setValue: setUsernameValue, ...usernameInput} = useField('username', 'text', 'Username')
    const {setValue: setPasswordValue, ...passwordInput} = useField('password', 'password', 'Password')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: usernameInput.value,
                password: passwordInput.value
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            dispatch(setUser(user))
            setUsernameValue('')
            setPasswordValue('')
            history.push('/blogs')
        }catch(exception){
            dispatch(notificationChange('Wrong credentials', 5))
        }
    }

    return(
        <div className={styles.centered}>
            <h1>log in to application</h1>
            <form onSubmit = {handleLogin}>
                <div>
                    username
                    <input
                        {...usernameInput}
                    />
                </div>
                <div>
                    password
                    <input
                        {...passwordInput}
                    />
                </div>
                <button id='login-button' type='submit'>login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
}

export default LoginForm