## Part 7

## Refactors

- Move the user state into the reducer
- add a user page
- add notes on converting state maintained into redux 

## Converting from stateful component into redux 

1. If you don't need to then don't do it
2. Gotta build reducers and combine them to create the state of the app 
```javascript

// Reducer Setup for Redux (https://react-redux.js.org/api/hooks#useStore)
const reducer = combineReducers({
    blogs: BlogReducer,
    notification: NotificationReducer,
    user: UserReducer
})

const store = createStore(reducer)
```
3. Use hooks from the react-redux api to pull the store state (https://react-redux.js.org/api/hooks#useStore)

## Building a SPA with routes

(https://www.sitepoint.com/react-router-complete-guide/)

1. Set up the router inside the store

```javascript
// Routing Setup for react-router (https://medium.com/@lavitr01051977/react-router-redux-app-with-call-to-api-70a324c34ecb)
const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path = "/" component= {App} />
                <Route path = "/" component= {App} />
            </BrowserRouter>
        </Provider>
    )
}
```

2. Adding protected routes: 

- use a custom protectedroute component that passes the parent component down to the Route Component. like so

```javascript
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
```

