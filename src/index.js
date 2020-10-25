import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import React from 'react'

// Redux
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import NotificationReducer from './reducers/NotificationReducer.js'
import BlogReducer from './reducers/BlogReducer.js'
import UserReducer from './reducers/UserReducer'

// React-Router
import { Route, BrowserRouter, Redirect } from 'react-router-dom'

// Services
import blogService from './services/blogs'
import userService from './services/users'

// Layouts
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import UserListPage from './components/UserListPage'
import BlogsListPage from './components/BlogsListPage'
import App from './App'
import Nav from './components/Nav'
import LoginPage from './components/LoginPage'


// Reducer Setup for Redux (https://react-redux.js.org/api/hooks#useStore)
const reducer = combineReducers({
    blogs: BlogReducer,
    notification: NotificationReducer,
    users: UserReducer
})

const store = createStore(reducer)

blogService.getAll().then(blogs => {
    store.dispatch({
        type: 'POPULATE',
        value: blogs
    })
})

userService.getAll().then(users => {
    store.dispatch({
        type: 'POPULATE_USERS',
        value: users
    })
})

const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
if (loggedUserJSON) {
    console.log('user logged in =' + loggedUserJSON)
} else {
    console.log('no user is logged in ')
}

// Routing Setup for react-router (https://medium.com/@lavitr01051977/react-router-redux-app-with-call-to-api-70a324c34ecb)
const Root = ({ store }) => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Nav />
                <Route exact path = "/" component = {App} />
                <Route path = "/login" component = {LoginPage} />
                <Route path = "/users" component = {UserListPage} />
                <Route path = "/blogs" component = {BlogsListPage} />
                <Route path = "/user/:userId" component = {UserPage} />
                <Route path = "/blog/:blogId" component = {BlogPage} />
            </BrowserRouter>
        </Provider>
    )
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}

// todo: expand to prtoect all routes to logged in users
const PrivateRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                user  ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: '/login', state: { from: props.location } }}
                    />
                )
            }
        />
    )
}

// Initialize the Application
ReactDOM.render(<Root store={store} />,
    document.getElementById('root'))
