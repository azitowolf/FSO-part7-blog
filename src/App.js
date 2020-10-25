import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'

const App = () => {
    // todo : move this into the LoginPage as a custom hook!
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)
    const appStoreData = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        } else {
            console.warn('no user is logged in ')
        }
    }, [])

    // utility functions
    const setNotificationTimer = (content) => {
        dispatch({
            type: 'NOTIFY',
            message: content
        })
        setTimeout(() => {
            dispatch({
                type: 'NOTIFY',
                message: null
            })
        }, 5000)
    }

    // event handlers
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
            blogService.setToken(user.token)
            setNotificationTimer('Logged in successfully!')
        } catch (exception) {
            setNotificationTimer('wrong username or password')
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        setUser(null)
        setUsername('')
        setPassword('')
    }

    const handleAddBlogToServer = (blogObject) => {
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                dispatch({
                    type: 'ADD',
                    blog: returnedBlog
                })
                setNotificationTimer('successfully added your blog!')
            })
            .catch((exception) => {
                setNotificationTimer(`error caught - ${exception.message}`)
            })
    }

    const incrementLikesForBlog = (id) => {
        const blogObject = appStoreData.blogs.find((blog) => blog.id === id)
        blogService
            .update(id, { likes:blogObject.likes + 1 })
            .then((returnedBlog) => {
                dispatch({
                    type: 'INCREMENT_LIKE',
                    blog: returnedBlog
                })
                setNotificationTimer('liked!')
            })
            .catch((exception) => setNotificationTimer('error processing your request: ' + exception))
    }

    const deleteBlog = (id) => {
        blogService
            .destroy(id)
            .then(() => {
                dispatch({
                    type: 'DELETE',
                    blogId: id
                })
                setNotificationTimer('successfully deleted')
            })
            .catch((exception) => setNotificationTimer('error processing your request: ' + exception))
    }

    const functions = { deleteBlog, incrementLikesForBlog, handleAddBlogToServer, handleLogin, handleLogout, setNotificationTimer }
    let pageBody

    if (user) {
        pageBody = (
            <HomePage
                {...functions}
                blogs = {appStoreData.blogs}
                user = { user }
            />
        )
    } else {
        pageBody = (
            <div>
                <LoginPage
                    handleLogin = {handleLogin}
                    userName = {username}
                    setUsername = {setUsername}
                    password = {password}
                    setPassword = {setPassword}
                />
            </div>
        )
    }
    return (
        <>
            {pageBody}
        </>
    )
}

export default App