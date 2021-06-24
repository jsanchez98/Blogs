import React, {useState} from 'react'
import loginService from "../services/login"
import blogService from "../services/blogs"
import {setUser} from "../reducers/userReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {useDispatch} from 'react-redux'
import {useHistory} from "react-router-dom"
import styles from '../App.module.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {Container, Typography, Avatar,
        TextField, Button, Snackbar,
        CssBaseline} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert'

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
    const [open, setOpen] = useState(false)

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
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
                history.push('/blogs')
            }, 2000)
        }catch(exception){
            dispatch(notificationChange('Wrong credentials', 5))
        }
    }

    return(
        <>
        <Container component = 'main' maxWidth='xs'>
            <CssBaseline/>
            <div style={{marginTop: '100px'}}>
                <Typography component='h1' variant ='h5' style={{marginLeft: '23%'}}>
                    log in to application
                </Typography>
                <Avatar className={styles.avatar}>
                    <AccountCircleIcon/>
                </Avatar>
                <form onSubmit = {handleLogin}>
                    <TextField margin='normal' required className={styles.tf}
                               fullWidth id='username' variant='filled'
                               label='Username' name='username'
                               autoComplete='email' autoFocus
                               InputLabelProps={{
                                   className: styles.floatingLabelFocusStyle,
                               }} {...usernameInput}
                    />
                    <TextField margin='normal' required className={styles.tf}
                               fullWidth name='password' variant='filled'
                               label='Password' type='password'
                               id='password' autoComplete='current-password'
                               InputLabelProps={{
                                   className: styles.floatingLabelFocusStyle,
                               }}
                               {...passwordInput}
                    />
                    <Button
                        type='submit' fullWidth
                        variant='contained' color='primary'
                        id='login-button'
                        className={styles.submit}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </Container>
        <Snackbar open={open} >
            <Alert elevation={6} variant="filled" severity='success'>
               Login Successful
            </Alert>
        </Snackbar>
        </>
    )
}

LoginForm.propTypes = {
}

export default LoginForm